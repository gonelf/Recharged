import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const BILLING_WEBHOOK_SECRET = process.env.STRIPE_BILLING_WEBHOOK_SECRET!;

// POST /api/billing/webhook – handles Recharged's own subscription events
export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "No signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, BILLING_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const planMap: Record<string, string> = {
    [process.env.STRIPE_PRICE_STARTER ?? "price_starter"]: "STARTER",
    [process.env.STRIPE_PRICE_GROWTH ?? "price_growth"]: "GROWTH",
    [process.env.STRIPE_PRICE_ENTERPRISE ?? "price_enterprise"]: "ENTERPRISE",
  };

  switch (event.type) {
    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription;
      const userId = sub.metadata.rechargedUserId;
      if (!userId) break;

      const priceId =
        typeof sub.items.data[0].price === "string"
          ? sub.items.data[0].price
          : sub.items.data[0].price.id;
      const plan = planMap[priceId] ?? "STARTER";

      await prisma.user.update({
        where: { id: userId },
        data: {
          rechargedPlan: plan as never,
          rechargedSubId: sub.id,
          rechargedSubStatus: sub.status,
        },
      });
      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      const userId = sub.metadata.rechargedUserId;
      if (!userId) break;

      await prisma.user.update({
        where: { id: userId },
        data: {
          rechargedPlan: "FREE",
          rechargedSubId: null,
          rechargedSubStatus: "canceled",
        },
      });
      break;
    }
  }

  return NextResponse.json({ received: true });
}
