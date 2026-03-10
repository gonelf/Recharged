export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

async function getUserAccountIds(userId: string) {
  const accounts = await prisma.stripeAccount.findMany({
    where: { userId },
    select: { id: true },
  });
  return accounts.map((a) => a.id);
}

// GET /api/fraud/blocklist – list all blocklist entries
export async function GET(request: NextRequest) {
  const session = await getAuthSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const accountId = searchParams.get("accountId");
  const accountIds = await getUserAccountIds(session.user.id);

  const entries = await prisma.blocklistEntry.findMany({
    where: {
      stripeAccountId: accountId
        ? { in: accountIds.filter((id) => id === accountId) }
        : { in: accountIds },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(entries);
}

const addSchema = z.object({
  stripeAccountId: z.string(),
  type: z.enum(["EMAIL", "IP", "CARD_FINGERPRINT"]),
  value: z.string().min(1),
  reason: z.string().optional(),
});

// POST /api/fraud/blocklist – add entry
export async function POST(request: NextRequest) {
  const session = await getAuthSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const parsed = addSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const accountIds = await getUserAccountIds(session.user.id);
  if (!accountIds.includes(parsed.data.stripeAccountId)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const entry = await prisma.blocklistEntry.upsert({
    where: {
      stripeAccountId_type_value: {
        stripeAccountId: parsed.data.stripeAccountId,
        type: parsed.data.type,
        value: parsed.data.value,
      },
    },
    create: parsed.data,
    update: { reason: parsed.data.reason },
  });

  return NextResponse.json(entry, { status: 201 });
}

// DELETE /api/fraud/blocklist?id=xxx – remove entry
export async function DELETE(request: NextRequest) {
  const session = await getAuthSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const accountIds = await getUserAccountIds(session.user.id);
  const entry = await prisma.blocklistEntry.findFirst({
    where: { id, stripeAccountId: { in: accountIds } },
  });
  if (!entry) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.blocklistEntry.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
