export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

// POST /api/billing/portal – create Stripe billing portal session for Recharged customers
export async function POST() {
  const session = await getAuthSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { rechargedCustomerId: true },
  });

  if (!user?.rechargedCustomerId) {
    return NextResponse.json(
      { error: "No billing account found" },
      { status: 404 }
    );
  }

  const portalSession = await getStripe().billingPortal.sessions.create({
    customer: user.rechargedCustomerId,
    return_url: `${APP_URL}/settings`,
  });

  return NextResponse.json({ url: portalSession.url });
}
