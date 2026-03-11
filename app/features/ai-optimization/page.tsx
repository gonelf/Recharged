import Link from "next/link";
import { FeaturesNav } from "@/components/marketing/FeaturesNav";

const steps = [
  {
    number: "01",
    title: "Reacquire analyzes your signups",
    description:
      "We track every visitor, interaction, and conversion event on your trial signup page to build a rich picture of what drives customers to pay.",
  },
  {
    number: "02",
    title: "AI generates page variants",
    description:
      "Powered by Google Gemini, our AI creates multiple versions of your signup page — testing different headlines, CTAs, and value propositions.",
  },
  {
    number: "03",
    title: "A/B testing runs automatically",
    description:
      "Traffic is split across variants in real time. Reacquire monitors conversion rates and statistical significance without any manual setup.",
  },
  {
    number: "04",
    title: "Winning variant promoted",
    description:
      "The best-performing variant is automatically promoted to 100% of traffic. Your conversion rate improves continuously, hands-free.",
  },
];

const benefits = [
  {
    icon: "🤖",
    title: "AI-generated copy",
    description:
      "Gemini AI writes and tests dozens of headline and body text variants tailored to your product and audience.",
  },
  {
    icon: "📈",
    title: "Automatic A/B testing",
    description:
      "No manual experiment setup. Reacquire splits traffic, collects data, and finds winners — all automatically.",
  },
  {
    icon: "🎯",
    title: "Conversion-focused design",
    description:
      "Every variant is optimized for one goal: turning visitors into trial signups that convert to paying customers.",
  },
  {
    icon: "⚡",
    title: "Real-time iteration",
    description:
      "Variants go live in minutes. Losing variants are pulled quickly so you never leave conversions on the table.",
  },
  {
    icon: "📊",
    title: "Full experiment visibility",
    description:
      "See live conversion rates, visitor counts, and statistical significance for every variant in your dashboard.",
  },
  {
    icon: "🔁",
    title: "Continuous improvement",
    description:
      "Optimization never stops. After a winner is found, new variants are generated to keep pushing your conversion rate higher.",
  },
];

const stats = [
  { value: "57%", label: "Average trial conversion rate" },
  { value: "3.7×", label: "Revenue growth" },
  { value: "10+", label: "Variants tested per page" },
];

export default function AiOptimizationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <FeaturesNav activeHref="/features/ai-optimization" />

      {/* Hero */}
      <section className="text-center px-8 py-24 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-purple-900/50 border border-purple-700 rounded-full px-4 py-1.5 text-sm text-purple-300 mb-8">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          AI Optimization
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          Your signup page,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            optimized by AI
          </span>
        </h1>

        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
          Reacquire's AI continuously generates, tests, and promotes the
          highest-converting versions of your trial signup page — no designers
          or copywriters required.
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
            A fully automated optimization loop that improves your conversions
            around the clock.
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
            Let the AI handle your growth
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Stop guessing what converts. Start knowing.
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
            Let AI grow your conversions
          </h2>
          <p className="text-slate-300 mb-8 text-lg">
            Connect Reacquire today and watch your signup page improve itself
            every week.
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
