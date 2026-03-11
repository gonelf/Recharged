"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/features/payment-capture", icon: "💳", label: "Payment Capture" },
  { href: "/features/ai-optimization", icon: "🤖", label: "AI Optimization" },
  { href: "/features/dispute-protection", icon: "🛡️", label: "Dispute Protection" },
  { href: "/features/analytics", icon: "📊", label: "Analytics" },
  { href: "/features/backup-payment-methods", icon: "🔄", label: "Backup Payments" },
  { href: "/pricing", icon: null, label: "Pricing" },
];

export function HomeNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold">
          <span className="text-primary">Re</span>acquire
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-black/5 rounded-md transition font-medium"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="hidden sm:block px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 text-sm bg-primary text-primary-foreground border-2 border-black rounded-md font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition"
          >
            Start Free
          </Link>

          {/* Hamburger – mobile only */}
          <button
            className="md:hidden flex flex-col justify-center gap-1.5 p-2 border-2 border-black rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span
              className={`block h-0.5 w-5 bg-foreground transition-all duration-200 ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-foreground transition-all duration-200 ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-foreground transition-all duration-200 ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden mx-4 mb-4 border-2 border-black bg-card rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="p-2">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 rounded-md transition"
              >
                {l.icon && <span>{l.icon}</span>}
                {l.label}
              </Link>
            ))}
            <div className="mt-2 pt-2 border-t-2 border-black flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="px-4 py-2.5 text-sm font-medium text-center text-muted-foreground border-2 border-black rounded-md hover:bg-muted transition shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="px-4 py-2.5 text-sm font-bold text-center bg-primary text-primary-foreground border-2 border-black rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition"
              >
                Start Free Trial →
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
