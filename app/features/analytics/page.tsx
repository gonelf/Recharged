import type { Metadata } from "next";
import Link from "next/link";
import { FeaturesNav } from "@/components/marketing/FeaturesNav";

const PAGE_URL = "https://reacquire.io/features/analytics";

export const metadata: Metadata = {
  title: "Analytics – Trial-to-Paid Funnel & Revenue Metrics",
  description:
    "Real-time visibility into your trial conversion funnel, MRR growth, churn, and cohort analysis — all powered by live Stripe data. 30+ metrics tracked.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    url: PAGE_URL,
    title: "Analytics – Reacquire | Trial-to-Paid Funnel & Revenue Metrics",
    description:
      "Real-time trial-to-paid funnel metrics, MRR tracking, cohort analysis, and churn data — all powered by live Stripe data.",
  },
};

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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Analytics – Trial-to-Paid Funnel & Revenue Metrics",
  serviceType: "SaaS Revenue Analytics",
  url: PAGE_URL,
  description:
    "Reacquire's Analytics feature provides real-time trial conversion funnel metrics, MRR tracking, cohort analysis, and churn data — all backed by live Stripe data with 30+ metrics tracked automatically.",
  provider: {
    "@type": "Organization",
    name: "Reacquire",
    url: "https://reacquire.io",
  },
  areaServed: "Worldwide",
  offers: {
    "@type": "Offer",
    price: "1",
    priceCurrency: "USD",
    url: "https://reacquire.io/pricing",
    description: "Included on all Reacquire plans starting at $1/mo",
  },
};

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FeaturesNav activeHref="/features/analytics" />

      {/* Hero */}
      <section className="text-center px-8 py-24 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary rounded-full px-4 py-1.5 text-sm text-primary mb-8">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Analytics
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          Every conversion metric,{" "}
          <span className="text-primary">
            in one place
          </span>
        </h1>

        <p className="text-xl text-foreground/80 mb-10 max-w-2xl mx-auto">
          Reacquire gives you a real-time view of your entire trial-to-paid
          funnel. Know exactly what's working, what's not, and where to focus to
          grow revenue.
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
            From raw Stripe events to actionable conversion insights,
            automatically.
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
            Data that drives growth
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Stop flying blind. Start making decisions backed by your real
            conversion data.
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
            See your full conversion picture
          </h2>
          <p className="text-foreground/80 mb-8 text-lg">
            Connect Reacquire and get instant access to the analytics that show
            you exactly how to grow.
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
