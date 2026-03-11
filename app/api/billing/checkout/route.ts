export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { getStripe, RECHARGED_PRICES } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

const schema = z.object({
  plan: z.enum(["MRR_5K", "MRR_20K", "MRR_50K", "MRR_150K", "MRR_250K", "MRR_PLUS"]),
});

// POST /api/billing/checkout – create Stripe Checkout session for Recharged subscription
export async function POST(request: NextRequest) {
  const session = await getAuthSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { rechargedCustomerId: true, email: true, name: true },
  });

  // Create or reuse Stripe customer for Recharged billing
  let customerId = user?.rechargedCustomerId;
  if (!customerId) {
    const customer = await getStripe().customers.create({
      email: user?.email ?? session.user.email,
      name: user?.name ?? session.user.name ?? undefined,
      metadata: { rechargedUserId: session.user.id },
    });
    customerId = customer.id;
    await prisma.user.update({
      where: { id: session.user.id },
      data: { rechargedCustomerId: customerId },
    });
  }

  const priceId = RECHARGED_PRICES[parsed.data.plan];

  const checkoutSession = await getStripe().checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${APP_URL}/settings?billing=success`,
    cancel_url: `${APP_URL}/settings?billing=canceled`,
    subscription_data: {
      metadata: { rechargedUserId: session.user.id },
    },
  });

  return NextResponse.json({ url: checkoutSession.url });
}
