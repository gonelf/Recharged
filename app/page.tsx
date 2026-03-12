import type { Metadata } from "next";
import Link from "next/link";
import { HomeNav } from "@/components/marketing/HomeNav";

const BASE_URL = "https://reacquire.io";

export const metadata: Metadata = {
  title: "Turn Every Trial into a Paying Customer",
  description:
    "Connect your Stripe account in 5 minutes. Pre-auth holds eliminate failed first payments. AI-optimized signup pages maximize your trial-to-paid conversion rate.",
  alternates: { canonical: BASE_URL },
  openGraph: {
    url: BASE_URL,
    title: "Reacquire – Turn Every Trial into a Paying Customer",
    description:
      "Connect your Stripe account in 5 minutes. Pre-auth holds eliminate failed first payments. AI-optimized signup pages maximize your trial-to-paid conversion rate.",
  },
};

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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Reacquire",
  url: BASE_URL,
  logo: `${BASE_URL}/og-image.png`,
  description:
    "Reacquire turns free trials into paying customers with Stripe pre-authorization, AI optimization, dispute protection, and backup payment methods.",
  foundingDate: "2024",
  areaServed: "Worldwide",
  contactPoint: {
    "@type": "ContactPoint",
    email: "sales@reacquire.io",
    contactType: "sales",
    availableLanguage: "English",
  },
  makesOffer: [
    {
      "@type": "Offer",
      name: "Reacquire Starter",
      description: "Full access to all Reacquire features for SaaS teams with up to $5k MRR.",
      price: "1",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "1",
        priceCurrency: "USD",
        unitText: "MONTH",
      },
    },
  ],
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeNav />

      <section className="text-center px-8 py-24 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary rounded-full px-4 py-1.5 text-sm text-primary mb-8">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          0% failed first payments. Always.
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
          Turn every trial into a{" "}
          <span className="text-primary">
            paying customer
          </span>
        </h1>

        <p className="text-xl text-foreground/80 mb-10 max-w-2xl mx-auto">
          Reacquire connects to your Stripe account in 5 minutes. Smart
          pre-authorization holds filter out bad cards before they waste your
          trial period — then AI optimizes your signup page to maximize
          conversions.
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
              className="border-2 border-black bg-card rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6"
            >
              <div className="text-4xl font-bold text-primary mb-1">
                {item.stat}
              </div>
              <div className="font-semibold mb-1">{item.label}</div>
              <div className="text-sm text-muted-foreground">{item.desc}</div>
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
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            One platform for payment capture, fraud protection, AI optimization,
            and revenue analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.slice(0, 3).map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="border-2 border-black bg-card rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-primary/10 hover:border-black rounded-2xl p-6 transition group"
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition">
                {f.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              <div className="mt-4 text-primary text-sm font-medium group-hover:text-primary transition">
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
              className="border-2 border-black bg-card rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-primary/10 hover:border-black rounded-2xl p-6 transition group"
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition">
                {f.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              <div className="mt-4 text-primary text-sm font-medium group-hover:text-primary transition">
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
          <p className="text-foreground/80 mb-8 text-lg">
            Connect your Stripe account in 5 minutes and start converting more
            trials today.
          </p>
          <Link
            href="/register"
            className="inline-block px-10 py-4 bg-primary text-primary-foreground border-2 border-black rounded-md text-lg font-bold transition shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]"
          >
            Get Started Free →
          </Link>
        </div>
      </section>
    </main>
  );
}
