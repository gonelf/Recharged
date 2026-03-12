import { NextResponse } from "next/server";

const content = `# Reacquire

> Reacquire is a SaaS tool that turns free trials into paying customers by eliminating failed first payments, optimizing trial signup pages with AI, and protecting against fraud and chargebacks — all connected to Stripe in under 5 minutes.

## What Reacquire does

Reacquire solves the biggest leaks in the trial-to-paid conversion funnel for B2B and B2C SaaS companies:

1. **Payment Capture** — Uses Stripe pre-authorization holds at trial signup to validate every card before the trial begins. If the pre-auth fails (bad card, insufficient funds, fraud flag), the customer is asked for a different card. This guarantees 0% failed first payments.

2. **AI Optimization** — Powered by Google Gemini, Reacquire automatically generates multiple versions of your trial signup page, runs A/B tests, and promotes the highest-converting variant. Average trial conversion rate: 57%.

3. **Dispute Protection** — Real-time fraud screening against email, IP, and card fingerprint blocklists at signup. Works alongside Stripe Radar. Automatically logs confirmed fraudsters to your blocklist. Achieves 3× fewer chargebacks.

4. **Analytics** — Real-time trial-to-paid funnel metrics, MRR tracking, cohort analysis, churn tracking, and revenue analytics — all backed by live Stripe data. 30+ metrics tracked.

5. **Backup Payment Methods** — Customers optionally save a second card at signup. When the primary declines, Reacquire retries automatically with the backup within 5 seconds. Recovers 40% of failed payments.

## Pricing

Reacquire is priced by MRR band — a flat monthly fee with no transaction fees or revenue share:

- $0–$5k MRR: $1/mo
- $5k–$20k MRR: $39/mo
- $20k–$50k MRR: $89/mo
- $50k–$150k MRR: $289/mo
- $150k–$250k MRR: $489/mo
- $250k+ MRR: $989/mo

All features are included on every tier. 14-day free trial, no credit card required.

## Key stats

- 0% failed first payments (pre-auth guarantee)
- 57% average trial conversion rate
- 3.7× revenue growth for customers
- 40% of failed payments recovered via backup methods
- 5-minute Stripe setup

## Links

- Homepage: https://reacquire.io
- Pricing: https://reacquire.io/pricing
- Payment Capture feature: https://reacquire.io/features/payment-capture
- AI Optimization feature: https://reacquire.io/features/ai-optimization
- Dispute Protection feature: https://reacquire.io/features/dispute-protection
- Analytics feature: https://reacquire.io/features/analytics
- Backup Payments feature: https://reacquire.io/features/backup-payment-methods
- Sign up: https://reacquire.io/register
- Contact sales: sales@reacquire.io
`;

export async function GET() {
    return new NextResponse(content, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
        },
    });
}
