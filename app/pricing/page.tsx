import Link from "next/link";
import { FeaturesNav } from "@/components/marketing/FeaturesNav";

const tiers = [
  { mrr: "$0 – $5k MRR",      price: "$1",   plan: "MRR_5K" },
  { mrr: "$5k – $20k MRR",    price: "$39",  plan: "MRR_20K" },
  { mrr: "$20k – $50k MRR",   price: "$89",  plan: "MRR_50K" },
  { mrr: "$50k – $150k MRR",  price: "$289", plan: "MRR_150K" },
  { mrr: "$150k – $250k MRR", price: "$489", plan: "MRR_250K" },
  { mrr: "$250k+ MRR",        price: "$989", plan: "MRR_PLUS" },
];

const perks = [
  "No transaction fees",
  "All features included on every tier",
  "Cancel anytime",
  "Five-minute setup",
];

const faqs = [
  {
    q: "How do you determine my MRR tier?",
    a: "MRR is your total monthly subscription revenue from active paying customers. You self-select the tier that matches your current MRR — we trust you to upgrade as you grow.",
  },
  {
    q: "What if my MRR changes mid-month?",
    a: "You can upgrade or downgrade at any time from your settings. Changes take effect at the start of your next billing cycle.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes — every tier starts with a 14-day free trial. No credit card required.",
  },
  {
    q: "Are there transaction fees or revenue share?",
    a: "None. Reacquire charges a flat monthly fee based on your MRR band. We never take a percentage of the revenue you recover.",
  },
  {
    q: "Do all tiers include every feature?",
    a: "Yes. Pre-auth payment capture, dispute protection, AI optimization, backup payment methods, and full analytics are included on every tier — no feature gating.",
  },
  {
    q: "What payment methods do you support?",
    a: "Reacquire works with any payment method supported by Stripe, including cards, ACH, and SEPA.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <FeaturesNav activeHref="/pricing" />

      {/* Hero */}
      <section className="text-center px-8 py-20 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-purple-900/50 border border-purple-700 rounded-full px-4 py-1.5 text-sm text-purple-300 mb-8">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          Simple, transparent pricing
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          Pay a predictable{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            monthly fee
          </span>
        </h1>

        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Priced by your MRR, not your usage. Start for $1/mo and only pay
          more as your revenue grows.
        </p>
      </section>

      {/* MRR tier table */}
      <section className="px-8 pb-16 max-w-2xl mx-auto">
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          {tiers.map((tier, i) => (
            <div
              key={tier.plan}
              className={`flex items-center justify-between px-6 py-4 ${
                i < tiers.length - 1 ? "border-b border-white/10" : ""
              }`}
            >
              <span className="text-slate-300 font-medium">{tier.mrr}</span>
              <span className="text-purple-400 font-bold text-lg">
                {tier.price}
                <span className="text-slate-400 text-sm font-normal">/mo</span>
              </span>
            </div>
          ))}
        </div>

        {/* Perks */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          {perks.map((perk) => (
            <div key={perk} className="flex items-center gap-2 text-sm text-slate-300">
              <span className="text-purple-400 shrink-0">✓</span>
              {perk}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/register"
            className="inline-block px-10 py-4 bg-purple-600 hover:bg-purple-500 rounded-xl text-lg font-semibold transition shadow-lg shadow-purple-900/50"
          >
            Start Free Trial →
          </Link>
          <p className="mt-3 text-slate-500 text-sm">
            14-day free trial. No credit card required.
          </p>
        </div>
      </section>

      {/* What's included */}
      <section className="px-8 py-16 max-w-4xl mx-auto">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Every feature. Every tier.
          </h2>
          <p className="text-slate-400 mb-10 max-w-xl mx-auto">
            No feature gating, no add-ons. Every plan includes everything Reacquire offers.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-left">
            {[
              { icon: "💳", label: "Pre-auth payment capture" },
              { icon: "🛡️", label: "Dispute protection" },
              { icon: "🤖", label: "AI signup optimization" },
              { icon: "🔄", label: "Backup payment methods" },
              { icon: "📊", label: "Full analytics & cohorts" },
              { icon: "🔗", label: "Stripe Connect integration" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-sm font-medium text-slate-300">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-8 py-20 max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently asked questions
          </h2>
          <p className="text-slate-400 text-lg">
            Everything you need to know before you start.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.q}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <h3 className="font-semibold mb-2">{faq.q}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-24 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start your free trial today
          </h2>
          <p className="text-slate-300 mb-8 text-lg">
            Connect your Stripe account in 5 minutes and start converting more
            trials — for as little as $1/mo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="px-10 py-4 bg-purple-600 hover:bg-purple-500 rounded-xl text-lg font-semibold transition shadow-lg shadow-purple-900/50"
            >
              Get Started Free →
            </Link>
            <Link
              href="mailto:sales@reacquire.io"
              className="px-10 py-4 border border-slate-600 hover:border-slate-400 rounded-xl text-lg font-semibold transition"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
