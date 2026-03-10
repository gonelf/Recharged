import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { getConnectedStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

// POST /api/trials/[id]/capture – capture the pre-auth hold (convert to paid)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAuthSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const accounts = await prisma.stripeAccount.findMany({
    where: { userId: session.user.id },
    select: { id: true },
  });
  const accountIds = accounts.map((a) => a.id);

  const trial = await prisma.trial.findFirst({
    where: { id, stripeAccountId: { in: accountIds } },
    include: { stripeAccount: true },
  });

  if (!trial) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (trial.status !== "AUTHORIZED") {
    return NextResponse.json(
      { error: `Cannot capture trial with status ${trial.status}` },
      { status: 400 }
    );
  }

  const connectedStripe = getConnectedStripe(trial.stripeAccount.accessToken);

  try {
    const pi = await connectedStripe.paymentIntents.capture(
      trial.paymentIntentId
    );

    if (pi.status === "succeeded") {
      const updated = await prisma.trial.update({
        where: { id },
        data: { status: "CONVERTED", convertedAt: new Date() },
      });

      await prisma.conversionEvent.create({
        data: {
          stripeAccountId: trial.stripeAccountId,
          trialId: trial.id,
          eventType: "converted",
          metadata: { amountCents: trial.amountCents },
        },
      });

      // Increment page variant conversions
      if (trial.pageVariantId) {
        await prisma.pageVariant.update({
          where: { id: trial.pageVariantId },
          data: { conversions: { increment: 1 } },
        });
      }

      return NextResponse.json(updated);
    }

    return NextResponse.json(
      { error: "Capture failed", status: pi.status },
      { status: 402 }
    );
  } catch (err: unknown) {
    const stripeError = err as { message?: string };
    return NextResponse.json(
      { error: "Stripe capture failed", message: stripeError.message },
      { status: 402 }
    );
  }
}
