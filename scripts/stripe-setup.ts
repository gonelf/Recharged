/**
 * stripe-setup.ts
 *
 * Creates Reacquire's subscription products and prices in your Stripe account.
 * Run once per environment (test / live) and paste the printed price IDs into
 * your .env file.
 *
 * Usage:
 *   STRIPE_SECRET_KEY=sk_test_... npx tsx scripts/stripe-setup.ts
 *
 * Or if STRIPE_SECRET_KEY is already in your .env:
 *   npx tsx --env-file=.env scripts/stripe-setup.ts
 */

import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  console.error("Error: STRIPE_SECRET_KEY environment variable is not set.");
  process.exit(1);
}

const stripe = new Stripe(key, { apiVersion: "2025-02-24.acacia" });

const PLANS = [
  {
    envVar: "STRIPE_PRICE_STARTER",
    productName: "Reacquire Starter",
    productDescription:
      "Up to 500 active trials. Pre-auth payment capture, dispute protection, and analytics.",
    unitAmount: 4900, // $49.00
    nickname: "Starter – Monthly",
    metadata: { plan: "STARTER", maxTrials: "500" },
  },
  {
    envVar: "STRIPE_PRICE_GROWTH",
    productName: "Reacquire Growth",
    productDescription:
      "Up to 5,000 active trials. Everything in Starter plus AI optimization, backup payment methods, and priority support.",
    unitAmount: 14900, // $149.00
    nickname: "Growth – Monthly",
    metadata: { plan: "GROWTH", maxTrials: "5000" },
  },
  {
    envVar: "STRIPE_PRICE_ENTERPRISE",
    productName: "Reacquire Enterprise",
    productDescription:
      "Unlimited active trials. Everything in Growth plus dedicated account manager, SLA guarantee, multi-account Stripe support, and custom integrations.",
    unitAmount: 49900, // $499.00
    nickname: "Enterprise – Monthly",
    metadata: { plan: "ENTERPRISE", maxTrials: "unlimited" },
  },
] as const;

async function main() {
  console.log(
    `\nConnecting to Stripe (${key!.startsWith("sk_live") ? "LIVE" : "TEST"} mode)...\n`
  );

  const results: Array<{ envVar: string; priceId: string }> = [];

  for (const plan of PLANS) {
    // Create product
    const product = await stripe.products.create({
      name: plan.productName,
      description: plan.productDescription,
      metadata: { plan: plan.metadata.plan },
    });

    // Create recurring monthly price
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: plan.unitAmount,
      currency: "usd",
      recurring: { interval: "month" },
      nickname: plan.nickname,
      metadata: plan.metadata,
    });

    console.log(`✓ ${plan.productName}`);
    console.log(`  Product: ${product.id}`);
    console.log(`  Price:   ${price.id}  ($${plan.unitAmount / 100}/mo)\n`);

    results.push({ envVar: plan.envVar, priceId: price.id });
  }

  console.log("─".repeat(60));
  console.log("Add these to your .env file:\n");
  for (const { envVar, priceId } of results) {
    console.log(`${envVar}=${priceId}`);
  }
  console.log("");
}

main().catch((err) => {
  console.error("Stripe setup failed:", err.message);
  process.exit(1);
});
