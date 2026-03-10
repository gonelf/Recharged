export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const session = await getAuthSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { stripeAccountId } = await request.json();

  const account = await prisma.stripeAccount.findFirst({
    where: { stripeAccountId, userId: session.user.id },
  });

  if (!account) {
    return NextResponse.json({ error: "Account not found" }, { status: 404 });
  }

  try {
    await getStripe().oauth.deauthorize({
      client_id: process.env.STRIPE_CLIENT_ID!,
      stripe_user_id: stripeAccountId,
    });
  } catch {
    // Continue even if Stripe deauth fails (already disconnected)
  }

  await prisma.stripeAccount.delete({ where: { id: account.id } });

  return NextResponse.json({ success: true });
}
