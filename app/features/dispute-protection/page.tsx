import Link from "next/link";
import { FeaturesNav } from "@/components/marketing/FeaturesNav";

const steps = [
  {
    number: "01",
    title: "Risk signals checked at signup",
    description:
      "When a trial starts, Reacquire checks the email, IP address, and card fingerprint against your blocklist and known fraud patterns in real time.",
  },
  {
    number: "02",
    title: "High-risk signups blocked",
    description:
      "Customers matching fraud signals are blocked before any pre-auth is attempted. They never enter your pipeline, protecting your Stripe dispute rate.",
  },
  {
    number: "03",
    title: "Pre-auth catches bad cards",
    description:
      "For signups that pass fraud checks, a pre-authorization hold confirms the card is real and not flagged for suspicious activity.",
  },
  {
    number: "04",
    title: "Blocklist updates automatically",
    description:
      "When a chargeback or dispute occurs, Reacquire automatically adds the customer's identifiers to your blocklist to prevent repeat fraud.",
  },
];

const benefits = [
  {
    icon: "🛑",
    title: "Blocklist management",
    description:
      "Maintain custom blocklists by email, IP address, and card fingerprint. Block known bad actors before they waste a trial.",
  },
  {
    icon: "🔍",
    title: "Real-time fraud checks",
    description:
      "Every signup is screened against your blocklist and fraud signals in milliseconds — invisible to legitimate customers.",
  },
  {
    icon: "⚖️",
    title: "Chargeback prevention",
    description:
      "Pre-auth holds and fraud screening dramatically reduce chargebacks, protecting your Stripe account health and dispute rate.",
  },
  {
    icon: "🔔",
    title: "Dispute alerts",
    description:
      "Get notified immediately when a dispute is filed. Reacquire provides all the evidence you need to win the chargeback.",
  },
  {
    icon: "📋",
    title: "Audit trail",
    description:
      "Every fraud check, block action, and dispute is logged with full context for compliance and investigation.",
  },
  {
    icon: "🤝",
    title: "Stripe Radar integration",
    description:
      "Works alongside Stripe Radar to provide layered fraud protection — Reacquire's business logic plus Stripe's ML models.",
  },
];

const stats = [
  { value: "99%", label: "Fraud blocked at signup" },
  { value: "0.1%", label: "Target dispute rate" },
  { value: "3×", label: "Fewer chargebacks" },
];

export default function DisputeProtectionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <FeaturesNav activeHref="/features/dispute-protection" />

      {/* Hero */}
      <section className="text-center px-8 py-24 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-purple-900/50 border border-purple-700 rounded-full px-4 py-1.5 text-sm text-purple-300 mb-8">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          Dispute Protection
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          Stop fraud before it{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            becomes a dispute
          </span>
        </h1>

        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
          Reacquire screens every trial signup for fraud signals, blocks known
          bad actors, and pre-authorizes cards — so chargebacks and disputes
          never make it to your Stripe account.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register"
            className="px-8 py-4 bg-purple-600 hover:bg-purple-500 rounded-xl text-lg font-semibold transition shadow-lg shadow-purple-900/50"
          >
            Start Free Trial →
          </Link>
          <Link
            href="/login"
            className="px-8 py-4 border border-slate-600 hover:border-slate-400 rounded-xl text-lg font-semibold transition"
          >
            Sign In
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="px-8 pb-16 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((s) => (
            <div
              key={s.value}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
            >
              <div className="text-4xl font-bold text-purple-400 mb-1">
                {s.value}
              </div>
              <div className="text-slate-300 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="px-8 py-20 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works</h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Multi-layer fraud protection that acts before money ever changes
            hands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white/5 border border-white/10 rounded-2xl p-7 flex gap-5"
            >
              <div className="text-3xl font-black text-purple-500/60 shrink-0 leading-none mt-0.5">
                {step.number}
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits grid */}
      <section className="px-8 py-20 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Enterprise-grade fraud protection
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Keep your Stripe account healthy and your revenue protected.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <div className="text-3xl mb-3">{b.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{b.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {b.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-24 text-center">
        <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Protect your revenue from day one
          </h2>
          <p className="text-slate-300 mb-8 text-lg">
            Set up Reacquire in 5 minutes and start blocking fraud before it
            becomes your problem.
          </p>
          <Link
            href="/register"
            className="inline-block px-10 py-4 bg-purple-600 hover:bg-purple-500 rounded-xl text-lg font-semibold transition shadow-lg shadow-purple-900/50"
          >
            Get Started Free →
          </Link>
        </div>
      </section>
    </div>
  );
}
