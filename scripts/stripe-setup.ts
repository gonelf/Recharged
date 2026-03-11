/**
 * stripe-setup.ts
 *
 * Creates Reacquire's MRR-based subscription products and prices in your
 * Stripe account. Run once per environment (test / live) and paste the
 * printed price IDs into your .env file.
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
    envVar: "STRIPE_PRICE_MRR_5K",
    productName: "Reacquire – $0–$5k MRR",
    productDescription:
      "For teams with up to $5k monthly recurring revenue. All Reacquire features included.",
    unitAmount: 100,   // $1.00
    nickname: "$0–$5k MRR – $1/mo",
    metadata: { plan: "MRR_5K", mrrBand: "0-5k" },
  },
  {
    envVar: "STRIPE_PRICE_MRR_20K",
    productName: "Reacquire – $5k–$20k MRR",
    productDescription:
      "For teams with $5k–$20k monthly recurring revenue. All Reacquire features included.",
    unitAmount: 3900,  // $39.00
    nickname: "$5k–$20k MRR – $39/mo",
    metadata: { plan: "MRR_20K", mrrBand: "5k-20k" },
  },
  {
    envVar: "STRIPE_PRICE_MRR_50K",
    productName: "Reacquire – $20k–$50k MRR",
    productDescription:
      "For teams with $20k–$50k monthly recurring revenue. All Reacquire features included.",
    unitAmount: 8900,  // $89.00
    nickname: "$20k–$50k MRR – $89/mo",
    metadata: { plan: "MRR_50K", mrrBand: "20k-50k" },
  },
  {
    envVar: "STRIPE_PRICE_MRR_150K",
    productName: "Reacquire – $50k–$150k MRR",
    productDescription:
      "For teams with $50k–$150k monthly recurring revenue. All Reacquire features included.",
    unitAmount: 28900, // $289.00
    nickname: "$50k–$150k MRR – $289/mo",
    metadata: { plan: "MRR_150K", mrrBand: "50k-150k" },
  },
  {
    envVar: "STRIPE_PRICE_MRR_250K",
    productName: "Reacquire – $150k–$250k MRR",
    productDescription:
      "For teams with $150k–$250k monthly recurring revenue. All Reacquire features included.",
    unitAmount: 48900, // $489.00
    nickname: "$150k–$250k MRR – $489/mo",
    metadata: { plan: "MRR_250K", mrrBand: "150k-250k" },
  },
  {
    envVar: "STRIPE_PRICE_MRR_PLUS",
    productName: "Reacquire – $250k+ MRR",
    productDescription:
      "For teams with $250k+ monthly recurring revenue. All Reacquire features included.",
    unitAmount: 98900, // $989.00
    nickname: "$250k+ MRR – $989/mo",
    metadata: { plan: "MRR_PLUS", mrrBand: "250k+" },
  },
] as const;

async function main() {
  console.log(
    `\nConnecting to Stripe (${key!.startsWith("sk_live") ? "LIVE" : "TEST"} mode)...\n`
  );

  const results: Array<{ envVar: string; priceId: string }> = [];

  for (const plan of PLANS) {
    const product = await stripe.products.create({
      name: plan.productName,
      description: plan.productDescription,
      metadata: { plan: plan.metadata.plan, mrrBand: plan.metadata.mrrBand },
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: plan.unitAmount,
      currency: "usd",
      recurring: { interval: "month" },
      nickname: plan.nickname,
      metadata: { plan: plan.metadata.plan, mrrBand: plan.metadata.mrrBand },
    });

    console.log(`✓ ${plan.productName}`);
    console.log(`  Product: ${product.id}`);
    console.log(`  Price:   ${price.id}  ($${(plan.unitAmount / 100).toFixed(0)}/mo)\n`);

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
