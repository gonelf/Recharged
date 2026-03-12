import type { Metadata } from "next";
import Link from "next/link";
import { FeaturesNav } from "@/components/marketing/FeaturesNav";

const PAGE_URL = "https://reacquire.io/features/ai-optimization";

export const metadata: Metadata = {
  title: "AI Optimization – AI-Powered Signup Page A/B Testing",
  description:
    "Gemini AI generates, tests, and promotes the highest-converting versions of your trial signup page — hands-free. Average 57% trial conversion rate.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    url: PAGE_URL,
    title: "AI Optimization – Reacquire | AI-Powered Signup Page A/B Testing",
    description:
      "Gemini AI auto-generates and A/B tests signup page variants. The winner gets promoted automatically. 57% average trial conversion rate.",
  },
};

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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Optimization – Signup Page A/B Testing",
  serviceType: "AI-Powered Conversion Optimization",
  url: PAGE_URL,
  description:
    "Reacquire's AI Optimization feature uses Google Gemini to automatically generate, A/B test, and promote the highest-converting trial signup page variants — achieving a 57% average trial conversion rate.",
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

export default function AiOptimizationPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FeaturesNav activeHref="/features/ai-optimization" />

      {/* Hero */}
      <section className="text-center px-8 py-24 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary rounded-full px-4 py-1.5 text-sm text-primary mb-8">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          AI Optimization
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          Your signup page,{" "}
          <span className="text-primary">
            optimized by AI
          </span>
        </h1>

        <p className="text-xl text-foreground/80 mb-10 max-w-2xl mx-auto">
          Reacquire's AI continuously generates, tests, and promotes the
          highest-converting versions of your trial signup page — no designers
          or copywriters required.
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
            A fully automated optimization loop that improves your conversions
            around the clock.
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
            Let the AI handle your growth
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Stop guessing what converts. Start knowing.
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
            Let AI grow your conversions
          </h2>
          <p className="text-foreground/80 mb-8 text-lg">
            Connect Reacquire today and watch your signup page improve itself
            every week.
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
