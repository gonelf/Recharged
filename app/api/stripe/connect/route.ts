export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
const STRIPE_CLIENT_ID = process.env.STRIPE_CLIENT_ID!;

// GET /api/stripe/connect – redirect to Stripe OAuth
export async function GET() {
  const session = await getAuthSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const params = new URLSearchParams({
    response_type: "code",
    client_id: STRIPE_CLIENT_ID,
    scope: "read_write",
    redirect_uri: `${APP_URL}/api/stripe/connect/callback`,
    state: session.user.id,
  });

  return NextResponse.redirect(
    `https://connect.getStripe().com/oauth/authorize?${params.toString()}`
  );
}
