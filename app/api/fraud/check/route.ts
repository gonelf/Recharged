import { NextRequest, NextResponse } from "next/server";
import { getConnectedStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  stripeAccountId: z.string(), // Recharged internal ID
  email: z.string().email(),
  ip: z.string().optional(),
  cardFingerprint: z.string().optional(),
});

// POST /api/fraud/check – pre-signup fraud check
// Called by the embeddable widget before processing a trial signup
export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { stripeAccountId, email, ip, cardFingerprint } = parsed.data;

  const stripeAccount = await prisma.stripeAccount.findUnique({
    where: { id: stripeAccountId },
  });
  if (!stripeAccount) {
    return NextResponse.json({ error: "Account not found" }, { status: 404 });
  }

  // 1. Check local blocklist (email, IP, card fingerprint)
  const blocklistChecks = [
    { type: "EMAIL" as const, value: email },
    ...(ip ? [{ type: "IP" as const, value: ip }] : []),
    ...(cardFingerprint
      ? [{ type: "CARD_FINGERPRINT" as const, value: cardFingerprint }]
      : []),
  ];

  for (const check of blocklistChecks) {
    const entry = await prisma.blocklistEntry.findFirst({
      where: {
        stripeAccountId: stripeAccount.id,
        type: check.type,
        value: check.value,
      },
    });
    if (entry) {
      await prisma.conversionEvent.create({
        data: {
          stripeAccountId: stripeAccount.id,
          eventType: "fraud_blocked",
          metadata: {
            reason: entry.reason ?? `Blocked ${check.type.toLowerCase()}`,
            value: check.value,
            type: check.type,
          },
        },
      });
      return NextResponse.json({
        blocked: true,
        reason: entry.reason ?? `Your ${check.type.toLowerCase()} has been flagged`,
      });
    }
  }

  // 2. Check Stripe Radar – look for recent early fraud warnings on this email
  try {
    const connectedStripe = getConnectedStripe(stripeAccount.accessToken);

    // Find the most recent customer with this email
    const customers = await connectedStripe.customers.list({
      email,
      limit: 1,
    });

    if (customers.data.length > 0) {
      const customerId = customers.data[0].id;

      // List payment intents for this customer
      const paymentIntents = await connectedStripe.paymentIntents.list({
        customer: customerId,
        limit: 5,
      });

      for (const pi of paymentIntents.data) {
        const warnings = await connectedStripe.radar.earlyFraudWarnings.list({
          payment_intent: pi.id,
        });

        if (warnings.data.length > 0) {
          return NextResponse.json({
            blocked: true,
            reason: "This card has been flagged for potential fraud",
          });
        }
      }
    }
  } catch {
    // Radar check failure is non-fatal — allow signup
  }

  return NextResponse.json({ blocked: false });
}
