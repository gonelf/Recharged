export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { generateStripeAuthToken } from "@/lib/stripe-auth-token";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

// GET /api/stripe/connect/callback – Stripe OAuth callback
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  const isAuthFlow = state === "auth";

  if (error || !code || !state) {
    const dest = isAuthFlow ? "/login" : "/settings";
    return NextResponse.redirect(
      `${APP_URL}${dest}?error=stripe_connect_failed`
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
    const accountEmail = account.email ?? null;
    const accountName = account.business_profile?.name ?? accountEmail ?? null;

    if (isAuthFlow) {
      // ── Auth flow: create or find the Recharged user ──────────────────────
      // Look up by existing Stripe account first, then by email
      let user = await prisma.user.findFirst({
        where: {
          OR: [
            { stripeAccounts: { some: { stripeAccountId: connectedAccountId } } },
            ...(accountEmail ? [{ email: accountEmail }] : []),
          ],
        },
      });

      if (!user) {
        // New user – create from Stripe account info
        const email =
          accountEmail ?? `${connectedAccountId}@stripe-connect.local`;
        user = await prisma.user.create({
          data: { email, name: accountName },
        });
      }

      // Upsert the StripeAccount record
      await prisma.stripeAccount.upsert({
        where: { stripeAccountId: connectedAccountId },
        create: {
          userId: user.id,
          stripeAccountId: connectedAccountId,
          accessToken,
          refreshToken,
          livemode,
          accountName,
          accountEmail,
        },
        update: {
          userId: user.id,
          accessToken,
          refreshToken,
          livemode,
          accountName,
          accountEmail,
        },
      });

      // Generate a short-lived signed token and redirect to login
      const stripeToken = generateStripeAuthToken(user.id);
      return NextResponse.redirect(
        `${APP_URL}/login?stripe_token=${encodeURIComponent(stripeToken)}`
      );
    }

    // ── Post-login connect flow: link account to existing user ───────────────
    const userId = state;
    await prisma.stripeAccount.upsert({
      where: { stripeAccountId: connectedAccountId },
      create: {
        userId,
        stripeAccountId: connectedAccountId,
        accessToken,
        refreshToken,
        livemode,
        accountName,
        accountEmail,
      },
      update: {
        accessToken,
        refreshToken,
        livemode,
        accountName,
        accountEmail,
      },
    });

    return NextResponse.redirect(`${APP_URL}/settings?success=stripe_connected`);
  } catch (err) {
    console.error("Stripe OAuth callback error:", err);
    const dest = isAuthFlow ? "/login" : "/settings";
    return NextResponse.redirect(
      `${APP_URL}${dest}?error=stripe_connect_failed`
    );
  }
}
