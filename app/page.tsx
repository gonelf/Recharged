import Link from "next/link";

const features = [
  {
    href: "/features/payment-capture",
    icon: "💳",
    title: "Payment Capture",
    desc: "Pre-auth holds validate every card before your trial begins. Zero failed first payments — guaranteed.",
  },
  {
    href: "/features/ai-optimization",
    icon: "🤖",
    title: "AI Optimization",
    desc: "Gemini AI generates and A/B tests signup page variants automatically, lifting your conversion rate hands-free.",
  },
  {
    href: "/features/dispute-protection",
    icon: "🛡️",
    title: "Dispute Protection",
    desc: "Real-time fraud screening and blocklists stop chargebacks before they ever reach your Stripe account.",
  },
  {
    href: "/features/analytics",
    icon: "📊",
    title: "Analytics",
    desc: "A live view of your entire trial-to-paid funnel with revenue metrics, cohort analysis, and churn tracking.",
  },
  {
    href: "/features/backup-payment-methods",
    icon: "🔄",
    title: "Backup Payments",
    desc: "Automatically retry failed charges with a backup card so you recover revenue without any manual effort.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold">
          <span className="text-purple-400">Re</span>acquire
        </div>
        <div className="hidden md:flex items-center gap-1">
          {features.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="px-3 py-1.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition font-medium"
            >
              {f.title}
            </Link>
          ))}
        </div>
        <div className="flex gap-4">
          <Link
            href="/login"
            className="px-4 py-2 text-sm text-slate-300 hover:text-white transition"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 text-sm bg-purple-600 hover:bg-purple-500 rounded-lg transition font-medium"
          >
            Start Free
          </Link>
        </div>
      </nav>

      <section className="text-center px-8 py-24 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-purple-900/50 border border-purple-700 rounded-full px-4 py-1.5 text-sm text-purple-300 mb-8">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          0% failed first payments. Always.
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
          Turn every trial into a{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            paying customer
          </span>
        </h1>

        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
          Reacquire connects to your Stripe account in 5 minutes. Smart
          pre-authorization holds filter out bad cards before they waste your
          trial period — then AI optimizes your signup page to maximize
          conversions.
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

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {[
            {
              stat: "0%",
              label: "Failed first payments",
              desc: "Pre-auth holds validate cards before trial begins",
            },
            {
              stat: "57%",
              label: "Trial conversion rate",
              desc: "AI-optimized signup pages + smart filtering",
            },
            {
              stat: "3.7×",
              label: "Revenue growth",
              desc: "More qualified trials, fewer chargebacks",
            },
          ].map((item) => (
            <div
              key={item.stat}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <div className="text-4xl font-bold text-purple-400 mb-1">
                {item.stat}
              </div>
              <div className="font-semibold mb-1">{item.label}</div>
              <div className="text-sm text-slate-400">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features section */}
      <section className="px-8 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need to convert trials
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            One platform for payment capture, fraud protection, AI optimization,
            and revenue analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.slice(0, 3).map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 rounded-2xl p-6 transition group"
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-300 transition">
                {f.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              <div className="mt-4 text-purple-400 text-sm font-medium group-hover:text-purple-300 transition">
                Learn more →
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.slice(3).map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 rounded-2xl p-6 transition group"
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-300 transition">
                {f.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              <div className="mt-4 text-purple-400 text-sm font-medium group-hover:text-purple-300 transition">
                Learn more →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="px-8 py-24 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to reacquire lost revenue?
          </h2>
          <p className="text-slate-300 mb-8 text-lg">
            Connect your Stripe account in 5 minutes and start converting more
            trials today.
          </p>
          <Link
            href="/register"
            className="inline-block px-10 py-4 bg-purple-600 hover:bg-purple-500 rounded-xl text-lg font-semibold transition shadow-lg shadow-purple-900/50"
          >
            Get Started Free →
          </Link>
        </div>
      </section>
    </main>
  );
}
