import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold">
          <span className="text-purple-400">Re</span>charged
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
          Recharged connects to your Stripe account in 5 minutes. Smart
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
    </main>
  );
}
