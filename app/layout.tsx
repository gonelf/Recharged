import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const BASE_URL = "https://reacquire.io";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Reacquire – Turn Every Trial into a Paying Customer",
    template: "%s | Reacquire",
  },
  description:
    "Connect your Stripe account in 5 minutes. Pre-auth holds eliminate failed first payments. AI-optimized signup pages maximize your trial-to-paid conversion rate.",
  keywords: [
    "trial to paid conversion",
    "SaaS payment capture",
    "Stripe pre-authorization",
    "failed payment recovery",
    "chargeback protection",
    "AI signup optimization",
    "trial conversion rate",
    "Stripe integration",
    "revenue recovery SaaS",
    "dunning management",
  ],
  authors: [{ name: "Reacquire", url: BASE_URL }],
  creator: "Reacquire",
  publisher: "Reacquire",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Reacquire",
    title: "Reacquire – Turn Every Trial into a Paying Customer",
    description:
      "Connect your Stripe account in 5 minutes. Pre-auth holds eliminate failed first payments. AI-optimized signup pages maximize your trial-to-paid conversion rate.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Reacquire – Turn every trial into a paying customer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reacquire – Turn Every Trial into a Paying Customer",
    description:
      "Connect your Stripe account in 5 minutes. Pre-auth holds eliminate failed first payments. AI-optimized signup pages maximize your trial-to-paid conversion rate.",
    images: ["/og-image.png"],
    creator: "@reacquireio",
    site: "@reacquireio",
  },
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Reacquire",
    url: BASE_URL,
    description:
      "Reacquire turns free trials into paying customers with Stripe pre-authorization payment capture, AI-powered signup optimization, dispute protection, and backup payment methods.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "1",
      highPrice: "989",
      priceCurrency: "USD",
      offerCount: "6",
    },
    provider: {
      "@type": "Organization",
      name: "Reacquire",
      url: BASE_URL,
      contactPoint: {
        "@type": "ContactPoint",
        email: "sales@reacquire.io",
        contactType: "sales",
      },
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
