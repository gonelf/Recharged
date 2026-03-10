export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

// GET /api/stripe/connect/callback – Stripe OAuth callback
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const userId = searchParams.get("state");
  const error = searchParams.get("error");

  if (error || !code || !userId) {
    return NextResponse.redirect(
      `${APP_URL}/settings?error=stripe_connect_failed`
    );
  }

  try {
    const response = await getStripe().oauth.token({
      grant_type: "authorization_code",
      code,
    });

    const connectedAccountId = response.stripe_user_id!;
    const accessToken = response.access_token!;
    const refreshToken = response.refresh_token ?? null;
    const livemode = response.livemode ?? false;

    // Fetch account details
    const account = await getStripe().accounts.retrieve(connectedAccountId);

    // Upsert the StripeAccount record
    await prisma.stripeAccount.upsert({
      where: { stripeAccountId: connectedAccountId },
      create: {
        userId,
        stripeAccountId: connectedAccountId,
        accessToken,
        refreshToken,
        livemode,
        accountName: account.business_profile?.name ?? account.email ?? null,
        accountEmail: account.email ?? null,
      },
      update: {
        accessToken,
        refreshToken,
        livemode,
        accountName: account.business_profile?.name ?? account.email ?? null,
        accountEmail: account.email ?? null,
      },
    });

    return NextResponse.redirect(`${APP_URL}/settings?success=stripe_connected`);
  } catch (err) {
    console.error("Stripe OAuth callback error:", err);
    return NextResponse.redirect(
      `${APP_URL}/settings?error=stripe_connect_failed`
    );
  }
}
