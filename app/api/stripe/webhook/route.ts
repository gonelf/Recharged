import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { getResend, FROM_EMAIL } from "@/lib/resend";
import { getConnectedStripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    await handleWebhookEvent(event);
  } catch (err) {
    console.error(`Webhook handler error for ${event.type}:`, err);
    // Return 200 to avoid Stripe retrying unrecoverable errors
  }

  return NextResponse.json({ received: true });
}

async function handleWebhookEvent(event: Stripe.Event) {
  switch (event.type) {
    case "payment_intent.payment_failed": {
      const pi = event.data.object as Stripe.PaymentIntent;
      const trial = await prisma.trial.findUnique({
        where: { paymentIntentId: pi.id },
      });
      if (!trial) break;

      await prisma.trial.update({
        where: { id: trial.id },
        data: { status: "FAILED" },
      });
      await logEvent(trial.stripeAccountId, trial.id, "payment_failed", {
        errorCode: pi.last_payment_error?.code,
      });
      break;
    }

    case "payment_intent.canceled": {
      const pi = event.data.object as Stripe.PaymentIntent;
      const trial = await prisma.trial.findUnique({
        where: { paymentIntentId: pi.id },
      });
      if (!trial) break;

      // Only update if still authorized (don't overwrite CONVERTED)
      if (trial.status === "AUTHORIZED") {
        await prisma.trial.update({
          where: { id: trial.id },
          data: { status: "CANCELED", canceledAt: new Date() },
        });
        await logEvent(trial.stripeAccountId, trial.id, "canceled");
      }
      break;
    }

    case "payment_intent.succeeded": {
      const pi = event.data.object as Stripe.PaymentIntent;
      const trial = await prisma.trial.findUnique({
        where: { paymentIntentId: pi.id },
      });
      if (!trial) break;

      await prisma.trial.update({
        where: { id: trial.id },
        data: { status: "CONVERTED", convertedAt: new Date() },
      });
      await logEvent(trial.stripeAccountId, trial.id, "converted", {
        amount: pi.amount,
      });
      break;
    }

    case "customer.subscription.trial_will_end": {
      // Fired 3 days before trial ends on Stripe subscriptions.
      // We use this to prompt backup card + send discount.
      const sub = event.data.object as Stripe.Subscription;
      const connectedAccountId = event.account; // Set if from a connected account webhook
      if (!connectedAccountId) break;

      const stripeAccount = await prisma.stripeAccount.findUnique({
        where: { stripeAccountId: connectedAccountId },
      });
      if (!stripeAccount) break;

      const customerId =
        typeof sub.customer === "string" ? sub.customer : sub.customer.id;

      // Find the trial for this customer
      const trial = await prisma.trial.findFirst({
        where: { customerId, stripeAccountId: stripeAccount.id },
        orderBy: { createdAt: "desc" },
      });

      await sendBackupCardEmail(stripeAccount, customerId, trial?.id);
      break;
    }

    case "radar.early_fraud_warning.created": {
      // Auto-add to blocklist when Stripe flags a fraud warning
      const warning = event.data.object as Stripe.Radar.EarlyFraudWarning;
      const connectedAccountId = event.account;
      if (!connectedAccountId) break;

      const stripeAccount = await prisma.stripeAccount.findUnique({
        where: { stripeAccountId: connectedAccountId },
      });
      if (!stripeAccount) break;

      // Get the payment intent to find the customer
      const piId =
        typeof warning.payment_intent === "string"
          ? warning.payment_intent
          : warning.payment_intent?.id;
      if (!piId) break;

      const connectedStripe = getConnectedStripe(stripeAccount.accessToken);
      const pi = await connectedStripe.paymentIntents.retrieve(piId);

      if (pi.receipt_email) {
        await prisma.blocklistEntry.upsert({
          where: {
            stripeAccountId_type_value: {
              stripeAccountId: stripeAccount.id,
              type: "EMAIL",
              value: pi.receipt_email,
            },
          },
          create: {
            stripeAccountId: stripeAccount.id,
            type: "EMAIL",
            value: pi.receipt_email,
            reason: `Stripe Radar early fraud warning: ${warning.fraud_type}`,
          },
          update: {},
        });
      }
      break;
    }
  }
}

async function logEvent(
  stripeAccountId: string,
  trialId: string | null,
  eventType: string,
  metadata?: Record<string, unknown>
) {
  await prisma.conversionEvent.create({
    data: {
      stripeAccountId,
      trialId,
      eventType,
      metadata: (metadata ?? {}) as Record<string, string | number | boolean | null>,
    },
  });
}

async function sendBackupCardEmail(
  stripeAccount: { id: string; accessToken: string; accountName: string | null },
  customerId: string,
  trialId: string | undefined
) {
  const connectedStripe = getConnectedStripe(stripeAccount.accessToken);

  // Create a discount coupon for adding backup card
  const coupon = await connectedStripe.coupons.create({
    percent_off: 20,
    duration: "once",
    name: "Backup Card Reward",
    max_redemptions: 1,
  });

  // Get customer email
  const customer = await connectedStripe.customers.retrieve(customerId);
  if (customer.deleted) return;

  const email = customer.email;
  if (!email) return;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  await getResend().emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: `Add a backup card and get 20% off your first bill`,
    html: `
      <div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:24px">
        <h2 style="color:#1a1a2e">Your trial is ending soon</h2>
        <p>Thanks for trying ${stripeAccount.accountName ?? "our service"}! To ensure uninterrupted access, add a backup payment method.</p>
        <p><strong>As a thank you, use code <code>${coupon.id}</code> for 20% off your first bill.</strong></p>
        <a href="${appUrl}/widget/billing?coupon=${coupon.id}&customer=${customerId}"
           style="display:inline-block;background:#635bff;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;margin-top:16px">
          Add Backup Card &amp; Save 20%
        </a>
        <p style="color:#888;margin-top:24px;font-size:12px">
          You're receiving this because you started a trial with ${stripeAccount.accountName ?? "our service"}.
        </p>
      </div>
    `,
  });

  if (trialId) {
    await logEvent(stripeAccount.id, trialId, "backup_card_prompted", {
      couponId: coupon.id,
      email,
    });
  }
}
