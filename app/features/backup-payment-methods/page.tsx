import Link from "next/link";
import { FeaturesNav } from "@/components/marketing/FeaturesNav";

const steps = [
  {
    number: "01",
    title: "Customer adds a backup card",
    description:
      "During trial signup, customers can optionally save a second payment method. Reacquire stores it securely via Stripe — no additional PCI scope for you.",
  },
  {
    number: "02",
    title: "Primary payment attempted first",
    description:
      "When the trial converts, Reacquire charges the primary card as normal. Most customers convert without ever needing a fallback.",
  },
  {
    number: "03",
    title: "Backup charged if primary fails",
    description:
      "If the primary card declines — expired, over-limit, or flagged — Reacquire automatically retries with the backup method within seconds.",
  },
  {
    number: "04",
    title: "Customer notified to update card",
    description:
      "Whether the backup succeeds or both fail, Reacquire sends a targeted email prompting the customer to update their payment method.",
  },
];

const benefits = [
  {
    icon: "🔄",
    title: "Automatic retry logic",
    description:
      "When a primary card declines, the backup is charged immediately — no manual intervention required.",
  },
  {
    icon: "💳",
    title: "Multi-card support",
    description:
      "Customers can save multiple payment methods. Reacquire tries them in priority order until one succeeds.",
  },
  {
    icon: "📧",
    title: "Smart dunning emails",
    description:
      "Automated email sequences prompt customers to update cards before they expire and after a payment fails.",
  },
  {
    icon: "⏰",
    title: "Configurable retry schedule",
    description:
      "Set your own retry intervals — retry the same card after 3 days, then try the backup, then email. Fully configurable.",
  },
  {
    icon: "🔒",
    title: "Secure card storage",
    description:
      "All payment methods are stored as Stripe tokens. Reacquire never touches raw card data.",
  },
  {
    icon: "📊",
    title: "Recovery rate tracking",
    description:
      "See exactly how many failed payments were recovered by backup methods vs. required customer action.",
  },
];

const stats = [
  { value: "40%", label: "Failed payments recovered" },
  { value: "<5s", label: "Backup card retry time" },
  { value: "2×", label: "Payment recovery vs. email only" },
];

export default function BackupPaymentMethodsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <FeaturesNav activeHref="/features/backup-payment-methods" />

      {/* Hero */}
      <section className="text-center px-8 py-24 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary rounded-full px-4 py-1.5 text-sm text-primary mb-8">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Backup Payment Methods
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          Never lose a conversion to a{" "}
          <span className="text-primary">
            declined card
          </span>
        </h1>

        <p className="text-xl text-foreground/80 mb-10 max-w-2xl mx-auto">
          Reacquire lets customers save a backup payment method at signup. When
          a primary card declines, we automatically retry with the backup — so
          you recover revenue without lifting a finger.
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
            A seamless fallback system that recovers revenue automatically when
            cards decline.
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
            Recover revenue you used to lose
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Up to 40% of failed payments can be recovered with the right
            fallback strategy.
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
            Stop losing conversions to card declines
          </h2>
          <p className="text-foreground/80 mb-8 text-lg">
            Add backup payment method support to your trial flow in minutes with
            Reacquire.
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
