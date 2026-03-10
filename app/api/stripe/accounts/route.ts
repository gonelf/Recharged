export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/stripe/accounts – list connected accounts for the current user
export async function GET() {
  const session = await getAuthSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const accounts = await prisma.stripeAccount.findMany({
    where: { userId: session.user.id },
    select: {
      id: true,
      stripeAccountId: true,
      accountName: true,
      accountEmail: true,
      livemode: true,
      defaultTrialDays: true,
      backupCardDiscount: true,
      createdAt: true,
    },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json(accounts);
}
