import Link from "next/link";
import { FeaturesNav } from "@/components/marketing/FeaturesNav";

const steps = [
  {
    number: "01",
    title: "Every event is tracked",
    description:
      "Reacquire automatically captures trial starts, conversions, cancellations, failed payments, and more — no custom tracking code needed.",
  },
  {
    number: "02",
    title: "Funnels visualized in real time",
    description:
      "See exactly where customers drop off — from first visit to signup to conversion. Identify your biggest leaks in seconds.",
  },
  {
    number: "03",
    title: "Revenue metrics surfaced",
    description:
      "Track MRR, conversion rate, average trial length, and churn from a single dashboard. No spreadsheets required.",
  },
  {
    number: "04",
    title: "Insights drive decisions",
    description:
      "Use analytics data to guide AI optimization, tweak trial lengths, and adjust pricing — all with real data behind each decision.",
  },
];

const benefits = [
  {
    icon: "📊",
    title: "Conversion funnel",
    description:
      "Visualize the full funnel from trial start to paid conversion. See drop-off rates at every stage.",
  },
  {
    icon: "💰",
    title: "Revenue analytics",
    description:
      "Track MRR growth, average revenue per trial, and total captured revenue over any time period.",
  },
  {
    icon: "⏱️",
    title: "Trial duration insights",
    description:
      "Understand how trial length correlates with conversion. Find the optimal trial period for your product.",
  },
  {
    icon: "🌍",
    title: "Cohort analysis",
    description:
      "Group trials by signup date, plan, or source and compare conversion rates across cohorts.",
  },
  {
    icon: "📉",
    title: "Churn tracking",
    description:
      "Monitor cancellations and identify patterns that predict churn before it happens.",
  },
  {
    icon: "🔗",
    title: "Stripe data sync",
    description:
      "Analytics pull directly from your Stripe account, so your data is always accurate and up to date.",
  },
];

const stats = [
  { value: "Real-time", label: "Data refresh" },
  { value: "30+", label: "Metrics tracked" },
  { value: "100%", label: "Stripe-backed data" },
];

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <FeaturesNav activeHref="/features/analytics" />

      {/* Hero */}
      <section className="text-center px-8 py-24 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-purple-900/50 border border-purple-700 rounded-full px-4 py-1.5 text-sm text-purple-300 mb-8">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          Analytics
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          Every conversion metric,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            in one place
          </span>
        </h1>

        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
          Reacquire gives you a real-time view of your entire trial-to-paid
          funnel. Know exactly what's working, what's not, and where to focus to
          grow revenue.
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
            From raw Stripe events to actionable conversion insights,
            automatically.
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
            Data that drives growth
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Stop flying blind. Start making decisions backed by your real
            conversion data.
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
            See your full conversion picture
          </h2>
          <p className="text-slate-300 mb-8 text-lg">
            Connect Reacquire and get instant access to the analytics that show
            you exactly how to grow.
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
