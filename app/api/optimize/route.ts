export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { getGemini } from "@/lib/gemini";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import type { OptimizeRequest, PageVariantSuggestion } from "@/types";

const schema = z.object({
  stripeAccountId: z.string(),
  currentHeadline: z.string(),
  currentCta: z.string(),
  currentBody: z.string().optional(),
  productName: z.string(),
  trialDays: z.number().int().min(1).max(90),
  price: z.number().int().positive(), // cents
  recentConversionRate: z.number().min(0).max(100).optional(),
});

// POST /api/optimize – use Claude to generate trial page variant suggestions
export async function POST(request: NextRequest) {
  const session = await getAuthSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const data: OptimizeRequest = parsed.data;

  // Verify account ownership
  const accounts = await prisma.stripeAccount.findMany({
    where: { userId: session.user.id },
    select: { id: true },
  });
  const accountIds = accounts.map((a) => a.id);
  if (!accountIds.includes(data.stripeAccountId)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const priceFormatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(data.price / 100);

  const prompt = `You are a world-class SaaS conversion rate optimization (CRO) expert specializing in trial-to-paid conversion.

A SaaS company called "${data.productName}" wants to optimize their trial signup page to maximize conversion rates.

CURRENT PAGE COPY:
- Headline: "${data.currentHeadline}"
- CTA Button: "${data.currentCta}"
- Body copy: "${data.currentBody ?? "(none provided)"}"

CONTEXT:
- Trial length: ${data.trialDays} days
- Price after trial: ${priceFormatted}/month
- Current conversion rate: ${data.recentConversionRate != null ? `${data.recentConversionRate}%` : "unknown"}
- Payment model: Card is authorized (held) at signup but NOT charged until trial ends. Users can cancel for free.

Generate exactly 3 optimized page copy variants. Each variant should use a different psychological approach:
1. Urgency/Scarcity angle
2. Risk-reversal/Trust angle
3. Outcome/Transformation angle

For each variant, return a JSON object with these exact keys:
- name: short variant name (e.g. "Urgency Play")
- headline: compelling headline (10-15 words max)
- ctaText: CTA button text (2-5 words)
- bodyText: 1-2 sentence body copy that addresses objections
- badgeText: short trust badge text (e.g. "No charge for ${data.trialDays} days")
- rationale: 1 sentence explaining the CRO strategy

Return ONLY a valid JSON array of 3 objects. No markdown, no explanation, just the JSON array.`;

  let variants: PageVariantSuggestion[];
  try {
    const model = getGemini().getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    variants = JSON.parse(text);

    if (!Array.isArray(variants) || variants.length === 0) {
      throw new Error("Invalid response format");
    }
  } catch (err) {
    console.error("Gemini optimization error:", err);
    return NextResponse.json(
      { error: "AI optimization failed" },
      { status: 500 }
    );
  }

  // Save variants to the database
  const saved = await Promise.all(
    variants.map((v) =>
      prisma.pageVariant.create({
        data: {
          stripeAccountId: data.stripeAccountId,
          name: v.name,
          headline: v.headline,
          ctaText: v.ctaText,
          bodyText: v.bodyText,
          badgeText: v.badgeText,
          rationale: v.rationale,
          generatedByAI: true,
        },
      })
    )
  );

  return NextResponse.json(saved, { status: 201 });
}

// GET /api/optimize – list saved page variants
export async function GET(request: NextRequest) {
  const session = await getAuthSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const accountId = searchParams.get("accountId");

  const accounts = await prisma.stripeAccount.findMany({
    where: { userId: session.user.id },
    select: { id: true },
  });
  const accountIds = accounts.map((a) => a.id);

  const variants = await prisma.pageVariant.findMany({
    where: {
      stripeAccountId: accountId
        ? { in: accountIds.filter((id) => id === accountId) }
        : { in: accountIds },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(variants);
}
