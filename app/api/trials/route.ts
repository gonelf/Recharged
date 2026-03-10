import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { getConnectedStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// GET /api/trials – list all trials for the user's connected accounts
export async function GET(request: NextRequest) {
  const session = await getAuthSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const accountId = searchParams.get("accountId");

  const accounts = await prisma.stripeAccount.findMany({
    where: { userId: session.user.id },
    select: { id: true },
  });
  const accountIds = accounts.map((a) => a.id);

  const trials = await prisma.trial.findMany({
    where: {
      stripeAccountId: accountId
        ? { in: accountIds.filter((id) => id === accountId) }
        : { in: accountIds },
      ...(status ? { status: status as never } : {}),
    },
    include: {
      stripeAccount: {
        select: { id: true, accountName: true, stripeAccountId: true },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return NextResponse.json(trials);
}

const createTrialSchema = z.object({
  stripeAccountId: z.string(),  // Recharged internal ID
  paymentMethodId: z.string(),  // pm_xxx from Stripe Elements
  customerEmail: z.string().email(),
  customerName: z.string().optional(),
  amountCents: z.number().int().positive(),
  currency: z.string().default("usd"),
  priceId: z.string().optional(),
  trialDays: z.number().int().min(1).max(90).default(14),
  customerIp: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  pageVariantId: z.string().optional(),
});

// POST /api/trials – create a new trial with pre-auth hold
export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = createTrialSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // Verify ownership
  const session = await getAuthSession();
  const stripeAccount = session
    ? await prisma.stripeAccount.findFirst({
        where: { id: data.stripeAccountId, userId: session.user.id },
      })
    : await prisma.stripeAccount.findUnique({
        where: { id: data.stripeAccountId },
      });

  if (!stripeAccount) {
    return NextResponse.json({ error: "Account not found" }, { status: 404 });
  }

  const connectedStripe = getConnectedStripe(stripeAccount.accessToken);

  // Create or retrieve Stripe customer on the connected account
  const customers = await connectedStripe.customers.list({
    email: data.customerEmail,
    limit: 1,
  });

  const customer =
    customers.data[0] ??
    (await connectedStripe.customers.create({
      email: data.customerEmail,
      name: data.customerName,
    }));

  // Attach payment method to customer
  await connectedStripe.paymentMethods.attach(data.paymentMethodId, {
    customer: customer.id,
  });

  // Create manual-capture PaymentIntent (pre-auth hold)
  let paymentIntent;
  try {
    paymentIntent = await connectedStripe.paymentIntents.create({
      amount: data.amountCents,
      currency: data.currency,
      customer: customer.id,
      payment_method: data.paymentMethodId,
      confirm: true,
      capture_method: "manual", // Authorize only — no funds moved yet
      receipt_email: data.customerEmail,
      description: `Trial authorization for ${data.priceId ?? "subscription"}`,
      metadata: {
        rechargedAccountId: stripeAccount.id,
        trialDays: String(data.trialDays),
      },
    });
  } catch (err: unknown) {
    const stripeError = err as { message?: string };
    return NextResponse.json(
      { error: "Card authorization failed", message: stripeError.message },
      { status: 402 }
    );
  }

  if (paymentIntent.status !== "requires_capture") {
    return NextResponse.json(
      { error: "Unexpected payment status", status: paymentIntent.status },
      { status: 402 }
    );
  }

  const trialEndsAt = new Date();
  trialEndsAt.setDate(trialEndsAt.getDate() + data.trialDays);

  const trial = await prisma.trial.create({
    data: {
      stripeAccountId: stripeAccount.id,
      paymentIntentId: paymentIntent.id,
      customerId: customer.id,
      priceId: data.priceId,
      customerEmail: data.customerEmail,
      customerName: data.customerName,
      customerIp: data.customerIp,
      amountCents: data.amountCents,
      currency: data.currency,
      status: "AUTHORIZED",
      trialEndsAt,
      utmSource: data.utmSource,
      utmMedium: data.utmMedium,
      utmCampaign: data.utmCampaign,
      pageVariantId: data.pageVariantId,
    },
  });

  // Log the event
  await prisma.conversionEvent.create({
    data: {
      stripeAccountId: stripeAccount.id,
      trialId: trial.id,
      eventType: "trial_started",
      metadata: {
        paymentIntentId: paymentIntent.id,
        amountCents: data.amountCents,
        trialDays: data.trialDays,
      },
    },
  });

  // Increment page variant impression if set
  if (data.pageVariantId) {
    await prisma.pageVariant.update({
      where: { id: data.pageVariantId },
      data: { impressions: { increment: 1 } },
    });
  }

  return NextResponse.json(trial, { status: 201 });
}
