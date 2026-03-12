import type { MetadataRoute } from "next";

const BASE_URL = "https://reacquire.io";

// Use static dates so the sitemap has consistent ETags between builds.
// Update these when page content changes significantly.
const HOMEPAGE_UPDATED = new Date("2026-03-12");
const PRICING_UPDATED = new Date("2026-03-12");
const FEATURES_UPDATED = new Date("2026-03-12");

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: BASE_URL,
            lastModified: HOMEPAGE_UPDATED,
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/pricing`,
            lastModified: PRICING_UPDATED,
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/features/payment-capture`,
            lastModified: FEATURES_UPDATED,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/features/ai-optimization`,
            lastModified: FEATURES_UPDATED,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/features/dispute-protection`,
            lastModified: FEATURES_UPDATED,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/features/analytics`,
            lastModified: FEATURES_UPDATED,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/features/backup-payment-methods`,
            lastModified: FEATURES_UPDATED,
            changeFrequency: "monthly",
            priority: 0.8,
        },
    ];
}
