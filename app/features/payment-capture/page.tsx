import type { Metadata } from "next";
import Link from "next/link";
import { FeaturesNav } from "@/components/marketing/FeaturesNav";

const PAGE_URL = "https://reacquire.io/features/payment-capture";

export const metadata: Metadata = {
  title: "Payment Capture – Zero Failed First Payments",
  description:
    "Stripe pre-authorization holds validate every card at trial signup. Only real, chargeable payment methods convert — so your first payment always succeeds.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    url: PAGE_URL,
    title: "Payment Capture – Reacquire | Zero Failed First Payments",
    description:
      "Pre-auth holds validate every card before your trial begins. 0% failed first payments. 5-minute Stripe setup.",
  },
};

const steps = [
  {
    number: "01",
    title: "Customer enters card details",
    description:
      "Your trial signup form collects card info via Reacquire's embeddable widget — powered by Stripe Elements for PCI-compliant security.",
  },
  {
    number: "02",
    title: "Pre-authorization hold placed",
    description:
      "We immediately run a $0 pre-auth hold against the card. This validates the card is real, has funds, and is not flagged for fraud — before your trial ever starts.",
  },
  {
    number: "03",
    title: "Trial begins only on success",
    description:
      "If the pre-auth succeeds, the trial starts. If it fails, the customer is prompted to use a different card. No bad actors waste your trial period.",
  },
  {
    number: "04",
    title: "Automatic capture on conversion",
    description:
      "When the trial ends, Reacquire automatically captures the payment. No failed charges, no awkward re-billing flows — just seamless conversion.",
  },
];

const benefits = [
  {
    icon: "🛡️",
    title: "Zero failed first payments",
    description:
      "Pre-auth ensures every card is valid before a trial begins, eliminating the #1 cause of failed conversions.",
  },
  {
    icon: "⚡",
    title: "Instant card validation",
    description:
      "Know in milliseconds whether a payment method is valid — no waiting until the end of the trial to find out.",
  },
  {
    icon: "🔒",
    title: "PCI-compliant by default",
    description:
      "Card data never touches your servers. Stripe handles all sensitive payment data with bank-grade encryption.",
  },
  {
    icon: "🔄",
    title: "Seamless Stripe integration",
    description:
      "Connect your existing Stripe account in 5 minutes. Works alongside your current billing setup without any migration.",
  },
  {
    icon: "📊",
    title: "Full payment visibility",
    description:
      "Track every pre-auth, hold, and capture in real time from your Reacquire dashboard.",
  },
  {
    icon: "🎯",
    title: "Higher-quality trials",
    description:
      "Filter out free-loaders and fraud upfront so your team focuses on customers who are genuinely ready to pay.",
  },
];

const stats = [
  { value: "0%", label: "Failed first payments" },
  { value: "99.9%", label: "Pre-auth success rate" },
  { value: "5 min", label: "Setup time" },
];

export default function PaymentCapturePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <FeaturesNav activeHref="/features/payment-capture" />

      {/* Hero */}
      <section className="text-center px-8 py-24 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary rounded-full px-4 py-1.5 text-sm text-primary mb-8">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Payment Capture
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          Capture payments before{" "}
          <span className="text-primary">
            trials even begin
          </span>
        </h1>

        <p className="text-xl text-foreground/80 mb-10 max-w-2xl mx-auto">
          Reacquire uses Stripe pre-authorization holds to validate every card at
          signup. Only real, chargeable payment methods make it through — so
          your first payment always succeeds.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register"
            className="px-8 py-4 bg-primary text-primary-foreground border-2 border-black rounded-md text-lg font-bold transition shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]"
          >
            Start Free Trial →
          </Link>
          <Link
            href="/login"
            className="px-8 py-4 border-2 border-black rounded-md text-lg font-bold hover:bg-muted transition shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]"
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
              className="border-2 border-black bg-card rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 text-center"
            >
              <div className="text-4xl font-bold text-primary mb-1">
                {s.value}
              </div>
              <div className="text-foreground/80 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="px-8 py-20 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            A four-step flow that eliminates failed payments at the source.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="border-2 border-black bg-card rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-7 flex gap-5"
            >
              <div className="text-3xl font-black text-primary/40 shrink-0 leading-none mt-0.5">
                {step.number}
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
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
            Built for SaaS teams that convert
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Everything you need to ensure every trial starts with a valid
            payment method.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="border-2 border-black bg-card rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6"
            >
              <div className="text-3xl mb-3">{b.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{b.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {b.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-24 text-center">
        <div className="max-w-2xl mx-auto border-2 border-black bg-card rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to eliminate failed payments?
          </h2>
          <p className="text-foreground/80 mb-8 text-lg">
            Connect your Stripe account and start capturing payments the right
            way — before the trial even begins.
          </p>
          <Link
            href="/register"
            className="inline-block px-10 py-4 bg-primary text-primary-foreground border-2 border-black rounded-md text-lg font-bold transition shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]"
          >
            Get Started Free →
          </Link>
        </div>
      </section>
    </div>
  );
}
