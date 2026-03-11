import Link from "next/link";

const features = [
  { href: "/features/payment-capture", label: "Payment Capture" },
  { href: "/features/ai-optimization", label: "AI Optimization" },
  { href: "/features/dispute-protection", label: "Dispute Protection" },
  { href: "/features/analytics", label: "Analytics" },
  { href: "/features/backup-payment-methods", label: "Backup Payments" },
];

export function FeaturesNav({ activeHref }: { activeHref?: string }) {
  return (
    <nav className="flex items-center justify-between px-8 py-5 max-w-7xl mx-auto">
      <div className="flex items-center gap-10">
        <Link href="/" className="text-xl font-bold text-white shrink-0">
          <span className="text-purple-400">Re</span>acquire
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {features.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className={`px-3 py-1.5 text-sm rounded-lg transition font-medium ${
                activeHref === f.href
                  ? "bg-white/10 text-white"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {f.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="px-4 py-2 text-sm text-slate-300 hover:text-white transition"
        >
          Sign In
        </Link>
        <Link
          href="/register"
          className="px-4 py-2 text-sm bg-purple-600 hover:bg-purple-500 rounded-lg transition font-medium text-white"
        >
          Start Free
        </Link>
      </div>
    </nav>
  );
}
