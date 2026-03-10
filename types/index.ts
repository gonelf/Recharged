import type { Trial, StripeAccount, BlocklistEntry, PageVariant, TrialStatus, BlocklistType, RechargedPlan } from "@prisma/client";

export type { Trial, StripeAccount, BlocklistEntry, PageVariant, TrialStatus, BlocklistType, RechargedPlan };

// Extended Trial with stripe account info
export type TrialWithAccount = Trial & {
  stripeAccount: Pick<StripeAccount, "id" | "accountName" | "stripeAccountId">;
};

// Metrics for the dashboard
export interface DashboardMetrics {
  totalTrials: number;
  activeTrials: number;      // AUTHORIZED
  convertedTrials: number;
  canceledTrials: number;
  conversionRate: number;    // percent
  totalRevenue: number;      // cents
  revenueRecovered: number;  // cents (from trials that would have failed)
  failedPayments: number;
}

// AI optimization request/response
export interface OptimizeRequest {
  stripeAccountId: string;
  currentHeadline: string;
  currentCta: string;
  currentBody?: string;
  productName: string;
  trialDays: number;
  price: number; // cents
  recentConversionRate?: number;
}

export interface PageVariantSuggestion {
  name: string;
  headline: string;
  ctaText: string;
  bodyText: string;
  badgeText: string;
  rationale: string;
}

// Fraud check request/response
export interface FraudCheckRequest {
  email: string;
  ip?: string;
  cardFingerprint?: string;
}

export interface FraudCheckResult {
  blocked: boolean;
  reason?: string;
}

// NextAuth session extension
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
    };
  }
}
