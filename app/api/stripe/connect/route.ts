export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

// GET /api/stripe/connect – redirect to Stripe OAuth
// ?mode=auth  → authentication flow (no session required, creates/finds user)
// default     → connect an additional account (session required)
export async function GET(request: NextRequest) {
  const STRIPE_CLIENT_ID = process.env.STRIPE_CLIENT_ID;
  if (!STRIPE_CLIENT_ID) {
    return NextResponse.json(
      { error: "Stripe Connect is not configured (missing STRIPE_CLIENT_ID)" },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("mode");

  let state: string;

  if (mode === "auth") {
    // No session required – Stripe identity will determine the user
    state = "auth";
  } else {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    state = session.user.id;
  }

  const params = new URLSearchParams({
    response_type: "code",
    client_id: STRIPE_CLIENT_ID,
    scope: "read_write",
    redirect_uri: `${APP_URL}/api/stripe/connect/callback`,
    state,
  });

  return NextResponse.redirect(
    `https://connect.stripe.com/oauth/authorize?${params.toString()}`
  );
}
