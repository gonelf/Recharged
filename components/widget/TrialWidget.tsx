"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

interface Variant {
  id: string;
  headline: string;
  ctaText: string;
  bodyText: string | null;
  badgeText: string | null;
}

interface TrialWidgetProps {
  accountId: string;
  accountName: string | null;
  trialDays: number;
  variant: Variant | null;
  stripePublishableKey: string;
}

function TrialForm({
  accountId,
  trialDays,
  variant,
}: {
  accountId: string;
  trialDays: number;
  variant: Variant | null;
}) {
  const stripe = useStripe();
  const elements = useElements();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError("");

    // 1. Fraud check before touching Stripe
    const fraudRes = await fetch("/api/fraud/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stripeAccountId: accountId, email }),
    });
    const fraudData = await fraudRes.json();

    if (fraudData.blocked) {
      setError(fraudData.reason ?? "Your account has been flagged.");
      setLoading(false);
      return;
    }

    // 2. Create Stripe PaymentMethod from card element
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    const { paymentMethod, error: pmError } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: { name, email },
    });

    if (pmError || !paymentMethod) {
      setError(pmError?.message ?? "Card error");
      setLoading(false);
      return;
    }

    // 3. Create trial with pre-auth hold
    const trialRes = await fetch("/api/trials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        stripeAccountId: accountId,
        paymentMethodId: paymentMethod.id,
        customerEmail: email,
        customerName: name,
        amountCents: 4900, // Will be made configurable — placeholder $49
        trialDays,
        pageVariantId: variant?.id,
      }),
    });

    const trialData = await trialRes.json();

    if (!trialRes.ok) {
      setError(trialData.message ?? trialData.error ?? "Could not start trial");
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">
          Your trial has started!
        </h2>
        <p className="text-slate-600 text-sm">
          Your card has been verified. You won&apos;t be charged for {trialDays} days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Jane Smith"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@company.com"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Card Details
        </label>
        <div className="px-3 py-3 border border-slate-300 rounded-lg focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "14px",
                  color: "#1e293b",
                  fontFamily: "system-ui, sans-serif",
                  "::placeholder": { color: "#94a3b8" },
                },
              },
            }}
          />
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading || !stripe}
        className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition disabled:opacity-60 text-sm"
      >
        {loading ? "Starting trial..." : (variant?.ctaText ?? `Start ${trialDays}-Day Trial`)}
      </button>

      <p className="text-center text-xs text-slate-400">
        Your card is verified but <strong>not charged</strong> for {trialDays} days.
        Cancel anytime for free.
      </p>
    </form>
  );
}

export function TrialWidget({
  accountId,
  accountName,
  trialDays,
  variant,
  stripePublishableKey,
}: TrialWidgetProps) {
  const stripePromise = loadStripe(stripePublishableKey);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
        {/* Header */}
        <div className="text-center mb-6">
          {variant?.badgeText && (
            <div className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-medium px-3 py-1 rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              {variant.badgeText}
            </div>
          )}
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            {variant?.headline ?? `Start your ${trialDays}-day free trial`}
          </h1>
          {variant?.bodyText && (
            <p className="text-sm text-slate-500">{variant.bodyText}</p>
          )}
          {accountName && !variant?.bodyText && (
            <p className="text-sm text-slate-500">
              Try {accountName} free for {trialDays} days
            </p>
          )}
        </div>

        <Elements stripe={stripePromise}>
          <TrialForm
            accountId={accountId}
            trialDays={trialDays}
            variant={variant}
          />
        </Elements>

        <div className="flex items-center justify-center gap-1 mt-4">
          <span className="text-xs text-slate-400">Secured by</span>
          <span className="text-xs font-semibold text-slate-500">Stripe</span>
          <span className="text-xs text-slate-400">·</span>
          <span className="text-xs text-slate-400">Powered by</span>
          <span className="text-xs font-semibold text-purple-600">Recharged</span>
        </div>
      </div>
    </div>
  );
}
