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

// Recharged subscription price IDs (set these in your Stripe dashboard)
export const RECHARGED_PRICES = {
  STARTER: process.env.STRIPE_PRICE_STARTER ?? "price_starter",
  GROWTH: process.env.STRIPE_PRICE_GROWTH ?? "price_growth",
  ENTERPRISE: process.env.STRIPE_PRICE_ENTERPRISE ?? "price_enterprise",
} as const;
