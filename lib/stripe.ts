import Stripe from "stripe";

let _stripe: Stripe | null = null;

// Lazy singleton — only instantiated on first call (prevents build-time errors)
export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2025-02-24.acacia",
    });
  }
  return _stripe;
}

// Get a Stripe client scoped to a connected account's access token
export function getConnectedStripe(accessToken: string): Stripe {
  return new Stripe(accessToken, {
    apiVersion: "2025-02-24.acacia",
  });
}

// Recharged subscription price IDs — keyed by RechargedPlan enum value.
// Each tier is priced by the customer's MRR (Monthly Recurring Revenue).
export const RECHARGED_PRICES = {
  MRR_5K:   process.env.STRIPE_PRICE_MRR_5K   ?? "price_mrr_5k",   // $0–$5k MRR   → $1/mo
  MRR_20K:  process.env.STRIPE_PRICE_MRR_20K  ?? "price_mrr_20k",  // $5k–$20k MRR  → $47/mo
  MRR_50K:  process.env.STRIPE_PRICE_MRR_50K  ?? "price_mrr_50k",  // $20k–$50k MRR → $97/mo
  MRR_150K: process.env.STRIPE_PRICE_MRR_150K ?? "price_mrr_150k", // $50k–$150k MRR→ $297/mo
  MRR_250K: process.env.STRIPE_PRICE_MRR_250K ?? "price_mrr_250k", // $150k–$250k MRR→$497/mo
  MRR_PLUS: process.env.STRIPE_PRICE_MRR_PLUS ?? "price_mrr_plus", // $250k+ MRR    → $997/mo
} as const;
