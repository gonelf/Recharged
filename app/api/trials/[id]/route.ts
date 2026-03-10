import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function getTrialForUser(trialId: string, userId: string) {
  const accounts = await prisma.stripeAccount.findMany({
    where: { userId },
    select: { id: true },
  });
  const accountIds = accounts.map((a) => a.id);

  return prisma.trial.findFirst({
    where: { id: trialId, stripeAccountId: { in: accountIds } },
    include: {
      stripeAccount: {
        select: { id: true, accountName: true, stripeAccountId: true },
      },
      events: { orderBy: { createdAt: "asc" } },
    },
  });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAuthSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const trial = await getTrialForUser(id, session.user.id);
  if (!trial) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(trial);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAuthSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const trial = await getTrialForUser(id, session.user.id);
  if (!trial) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.trial.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
