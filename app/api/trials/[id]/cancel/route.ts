import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { getConnectedStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

// POST /api/trials/[id]/cancel – release the pre-auth hold (user canceled)
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
      { error: `Cannot cancel trial with status ${trial.status}` },
      { status: 400 }
    );
  }

  const connectedStripe = getConnectedStripe(trial.stripeAccount.accessToken);

  try {
    await connectedStripe.paymentIntents.cancel(trial.paymentIntentId);
  } catch {
    // If already canceled by Stripe (expired), proceed
  }

  const updated = await prisma.trial.update({
    where: { id },
    data: { status: "CANCELED", canceledAt: new Date() },
  });

  await prisma.conversionEvent.create({
    data: {
      stripeAccountId: trial.stripeAccountId,
      trialId: trial.id,
      eventType: "canceled",
    },
  });

  return NextResponse.json(updated);
}
