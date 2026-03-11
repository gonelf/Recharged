import Link from "next/link";
import { FeaturesNav } from "@/components/marketing/FeaturesNav";

const plans = [
  {
    name: "Starter",
    price: "$49",
    period: "/mo",
    description: "Perfect for early-stage SaaS with up to 500 active trials.",
    cta: "Start Free Trial",
    href: "/register",
    highlight: false,
    features: [
      "Up to 500 active trials",
      "Pre-auth payment capture",
      "Dispute protection",
      "Basic analytics dashboard",
      "Stripe Connect integration",
      "Email support",
    ],
  },
  {
    name: "Growth",
    price: "$149",
    period: "/mo",
    description: "For scaling SaaS teams that need AI and advanced recovery.",
    cta: "Start Free Trial",
    href: "/register",
    highlight: true,
    badge: "Most Popular",
    features: [
      "Up to 5,000 active trials",
      "Pre-auth payment capture",
      "Dispute protection",
      "AI signup page optimization",
      "Backup payment methods",
      "Full analytics + cohort analysis",
      "Stripe Connect integration",
      "Priority email & chat support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description:
      "For high-volume teams with custom workflows and dedicated support.",
    cta: "Contact Sales",
    href: "mailto:sales@reacquire.io",
    highlight: false,
    features: [
      "Unlimited active trials",
      "Pre-auth payment capture",
      "Dispute protection",
      "AI signup page optimization",
      "Backup payment methods",
      "Advanced analytics + custom reports",
      "Multi-account Stripe support",
      "SLA guarantee",
      "Dedicated account manager",
      "Custom integrations",
    ],
  },
];

const faqs = [
  {
    q: "Is there a free trial?",
    a: "Yes — every plan starts with a 14-day free trial. No credit card required to get started.",
  },
  {
    q: "What counts as an 'active trial'?",
    a: "An active trial is any trial period that is currently running in your Stripe account and managed by Reacquire. Trials that have converted or churned don't count.",
  },
  {
    q: "Can I switch plans later?",
    a: "Absolutely. You can upgrade or downgrade at any time from your dashboard. Changes take effect at the start of your next billing cycle.",
  },
  {
    q: "Do you charge a percentage of revenue?",
    a: "No. Reacquire charges a flat monthly fee — we never take a cut of your revenue or recovered payments.",
  },
  {
    q: "What payment methods do you support?",
    a: "Reacquire works with any payment method supported by Stripe, including cards, ACH, and SEPA.",
  },
  {
    q: "Is my Stripe data safe?",
    a: "Yes. We connect via Stripe's official OAuth (Stripe Connect) and never store raw card data. All sensitive payment data stays within Stripe's PCI-compliant infrastructure.",
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
          Pay for results,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            not complexity
          </span>
        </h1>

        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Flat monthly pricing. No revenue share. No hidden fees. Start free and
          upgrade as you grow.
        </p>
      </section>

      {/* Pricing cards */}
      <section className="px-8 pb-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 flex flex-col ${
                plan.highlight
                  ? "bg-purple-600/20 border-2 border-purple-500 shadow-xl shadow-purple-900/40"
                  : "bg-white/5 border border-white/10"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-lg font-bold mb-1">{plan.name}</h2>
                <div className="flex items-end gap-1 mb-3">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-slate-400 text-sm mb-1">
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <Link
                href={plan.href}
                className={`block text-center py-3 rounded-xl font-semibold text-sm transition mb-8 ${
                  plan.highlight
                    ? "bg-purple-500 hover:bg-purple-400 text-white shadow-lg shadow-purple-900/50"
                    : "bg-white/10 hover:bg-white/20 text-white"
                }`}
              >
                {plan.cta}
              </Link>

              <ul className="space-y-3 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <span className="text-purple-400 mt-0.5 shrink-0">✓</span>
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center text-slate-500 text-sm mt-8">
          All plans include a 14-day free trial. No credit card required.
        </p>
      </section>

      {/* Feature comparison callout */}
      <section className="px-8 py-16 max-w-4xl mx-auto">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Every plan includes the essentials
          </h2>
          <p className="text-slate-400 mb-10 max-w-xl mx-auto">
            No matter which plan you choose, you get the core features that make
            Reacquire work.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            {[
              { icon: "💳", label: "Pre-auth capture" },
              { icon: "🛡️", label: "Dispute protection" },
              { icon: "🔗", label: "Stripe Connect" },
              { icon: "📊", label: "Analytics dashboard" },
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
            Connect your Stripe account in 5 minutes and see why teams trust
            Reacquire to convert more trials.
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
