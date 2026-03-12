import { NextResponse } from "next/server";

const content = `# Reacquire

> Reacquire is a SaaS platform that turns free trials into paying customers by eliminating failed first payments, optimizing trial signup pages with AI, and protecting against fraud and chargebacks — all connected to Stripe in under 5 minutes.

## What Reacquire Does

Reacquire solves the three biggest leaks in the trial-to-paid conversion funnel for B2B and B2C SaaS companies:

1. **Failed first payments** — Bad cards, insufficient funds, and fraud flags cause many trial-to-paid conversions to fail silently. Reacquire eliminates this with Stripe pre-auth holds at signup.
2. **Low trial conversion rates** — Generic, static signup pages leave conversion rates far below what's possible. Reacquire uses Google Gemini AI to continuously generate and A/B test signup page variants.
3. **Chargebacks and fraud** — Free-trial abuse and friendly fraud eat into revenue and damage Stripe account health. Reacquire screens every signup with real-time fraud checks and blocklists.

## Core Features

### 1. Payment Capture
Uses Stripe pre-authorization holds at trial signup to validate every payment method before the trial begins. If the pre-auth fails (bad card, insufficient funds, fraud flag), the customer is prompted for a different card. This guarantees 0% failed first payments.

- $0 pre-auth hold placed at signup — invisible to the customer
- Validates card is real, funded, and not flagged
- Trial only starts if pre-auth succeeds
- Payment automatically captured when trial converts
- Works with any payment method Stripe supports: cards, ACH, SEPA

### 2. AI Optimization (Powered by Google Gemini)
Reacquire automatically generates multiple versions of your trial signup page, runs A/B tests, and promotes the highest-converting variant. The optimization loop runs continuously — no designers or copywriters needed.

- AI generates headline, subheading, and CTA variants
- Traffic split automatically across variants
- Winner promoted to 100% of traffic when statistically significant
- New variants generated after each winning cycle
- Average trial conversion rate achieved: 57%

### 3. Dispute Protection
Real-time fraud screening against email, IP, and card fingerprint blocklists at every trial signup. Works alongside Stripe Radar. Automatically logs confirmed fraudsters to your blocklist.

- Blocklist by email, IP address, and card fingerprint
- Signup checked in milliseconds — invisible to legitimate customers
- Chargeback alerts with evidence collection for disputes
- 3× fewer chargebacks vs. unprotected trials
- Audit trail for every fraud check and block action

### 4. Analytics
Real-time trial-to-paid funnel metrics, MRR tracking, cohort analysis, churn tracking, and revenue analytics — all backed by live Stripe data. No custom tracking code needed.

- Conversion funnel: trial start → paid conversion
- MRR growth, ARPU, and revenue trend charts
- Cohort analysis by signup date, plan, or acquisition source
- Churn and cancellation tracking
- 30+ metrics tracked automatically

### 5. Backup Payment Methods
Customers optionally save a second card at signup. When the primary declines, Reacquire automatically retries with the backup within 5 seconds. Recovers 40% of failed payments.

- Optional backup card collected at trial signup
- Stripe stores payment methods securely — no PCI scope increase
- Backup retried automatically within 5 seconds of primary decline
- Smart dunning email sequences for both outcomes
- Configurable retry schedule (retry intervals, number of attempts)

## Pricing

Reacquire is priced by MRR band — a flat monthly fee with no transaction fees or revenue share. All features are included on every tier.

| MRR Band         | Monthly Price |
|------------------|---------------|
| $0 – $5k MRR     | $1/mo         |
| $5k – $20k MRR   | $39/mo        |
| $20k – $50k MRR  | $89/mo        |
| $50k – $150k MRR | $289/mo       |
| $150k – $250k MRR| $489/mo       |
| $250k+ MRR       | $989/mo       |

- 14-day free trial on every tier — no credit card required
- No transaction fees, no revenue share, no feature gating
- Cancel anytime from account settings
- Upgrade or downgrade between tiers at any time

## Key Performance Stats

- 0% failed first payments (pre-auth guarantee)
- 57% average trial conversion rate
- 3.7× revenue growth for Reacquire customers
- 40% of failed payments recovered via backup methods
- 99% of fraud blocked at signup
- 3× fewer chargebacks
- 5-minute Stripe Connect setup

## How Reacquire Works (Technical Overview)

1. **Stripe Connect integration** — Reacquire connects to your Stripe account via Stripe Connect (OAuth). No migration required; works alongside your existing billing setup.
2. **Embeddable widget** — An embeddable Stripe Elements widget is added to your trial signup form. It collects payment info and runs the pre-auth hold.
3. **Webhook processing** — Reacquire listens to Stripe webhooks to track trial events, payment outcomes, and disputes in real time.
4. **AI optimization** — Google Gemini generates page variant content. Reacquire's own A/B testing infrastructure splits and tracks traffic.
5. **Fraud screening** — At each trial signup, Reacquire checks the customer's email, IP, and card fingerprint against your blocklist and known fraud patterns.
6. **Dashboard** — A web-based dashboard gives you full visibility into trials, conversions, revenue, fraud events, and AI experiment performance.

## Target Customers

- B2B SaaS companies with free trial conversion funnels
- B2C subscription businesses
- Any Stripe-powered product that offers a trial before billing
- Teams frustrated by failed first payments and low trial conversion rates

## Competitive Differentiation

- **vs. dunning tools (e.g., Churnbuster, Gravy)** — Reacquire prevents failed payments before they happen via pre-auth; dunning tools only react after a payment has already failed.
- **vs. A/B testing tools (e.g., Optimizely, VWO)** — Reacquire's AI generates content variants automatically; generic A/B tools require manual hypothesis creation and design work.
- **vs. fraud tools (e.g., Sift, Kount)** — Reacquire is purpose-built for SaaS trial fraud and is native to Stripe; enterprise fraud tools are expensive and not trial-specific.
- **vs. building in-house** — Reacquire delivers pre-auth, AI optimization, fraud protection, and analytics in 5 minutes; building any of these in-house takes months.

## Frequently Asked Questions

**What payment methods does Reacquire support?**
Any payment method supported by Stripe — credit/debit cards, ACH bank transfers, SEPA, and more.

**Does Reacquire work with my existing Stripe setup?**
Yes. Reacquire connects via Stripe Connect and works alongside your existing billing configuration. No migration needed.

**Does the pre-auth hold charge the customer?**
No. A $0 pre-authorization hold validates the card without charging it. The hold is released immediately after the check.

**How long does setup take?**
Most customers complete the Stripe Connect flow and add the widget to their signup form in under 5 minutes.

**Is there a free trial?**
Yes — every tier includes a 14-day free trial with no credit card required.

**Are there any transaction fees?**
No. Reacquire charges a flat monthly fee only. There are no transaction fees or revenue share of any kind.

**What if my MRR changes?**
You can upgrade or downgrade your plan at any time from your settings. Changes take effect at the start of the next billing cycle.

## Links

- Homepage: https://reacquire.io
- Pricing: https://reacquire.io/pricing
- Payment Capture feature: https://reacquire.io/features/payment-capture
- AI Optimization feature: https://reacquire.io/features/ai-optimization
- Dispute Protection feature: https://reacquire.io/features/dispute-protection
- Analytics feature: https://reacquire.io/features/analytics
- Backup Payments feature: https://reacquire.io/features/backup-payment-methods
- Sign up (free trial): https://reacquire.io/register
- Sign in: https://reacquire.io/login
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
