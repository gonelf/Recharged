import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// POST /api/optimize/[id]/activate – set a variant as active
export async function POST(
  _request: NextRequest,
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

  const variant = await prisma.pageVariant.findFirst({
    where: { id, stripeAccountId: { in: accountIds } },
  });
  if (!variant) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Deactivate all other variants for the same account
  await prisma.pageVariant.updateMany({
    where: { stripeAccountId: variant.stripeAccountId, isActive: true },
    data: { isActive: false },
  });

  const updated = await prisma.pageVariant.update({
    where: { id },
    data: { isActive: true },
  });

  return NextResponse.json(updated);
}
