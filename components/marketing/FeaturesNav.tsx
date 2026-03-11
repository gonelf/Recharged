import Link from "next/link";

const features = [
  { href: "/features/payment-capture", label: "Payment Capture" },
  { href: "/features/ai-optimization", label: "AI Optimization" },
  { href: "/features/dispute-protection", label: "Dispute Protection" },
  { href: "/features/analytics", label: "Analytics" },
  { href: "/features/backup-payment-methods", label: "Backup Payments" },
  { href: "/pricing", label: "Pricing" },
];

export function FeaturesNav({ activeHref }: { activeHref?: string }) {
  return (
    <nav className="flex items-center justify-between px-8 py-5 max-w-7xl mx-auto">
      <div className="flex items-center gap-10">
        <Link href="/" className="text-xl font-bold text-foreground shrink-0">
          <span className="text-primary">Re</span>acquire
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {features.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className={`px-3 py-1.5 text-sm rounded-lg transition font-medium ${
                activeHref === f.href
                  ? "bg-black text-white rounded-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-black/5"
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
          className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition"
        >
          Sign In
        </Link>
        <Link
          href="/register"
          className="px-4 py-2 text-sm bg-primary text-primary-foreground border-2 border-black rounded-md font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition"
        >
          Start Free
        </Link>
      </div>
    </nav>
  );
}
