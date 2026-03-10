"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

interface StripeAccount {
  id: string;
  stripeAccountId: string;
  accountName: string | null;
  accountEmail: string | null;
  livemode: boolean;
  defaultTrialDays: number;
  backupCardDiscount: number;
}

function SettingsContent() {
  const searchParams = useSearchParams();
  const [accounts, setAccounts] = useState<StripeAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [disconnecting, setDisconnecting] = useState<string | null>(null);
  const [billingLoading, setBillingLoading] = useState(false);

  const successMsg = searchParams.get("success");
  const errorMsg = searchParams.get("error");

  useEffect(() => {
    fetch("/api/stripe/accounts")
      .then((r) => r.json())
      .then(setAccounts)
      .finally(() => setLoading(false));
  }, []);

  async function disconnect(stripeAccountId: string) {
    if (!confirm("Disconnect this Stripe account? Existing trial data will be preserved.")) return;
    setDisconnecting(stripeAccountId);

    const res = await fetch("/api/stripe/disconnect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stripeAccountId }),
    });

    if (res.ok) {
      setAccounts((prev) => prev.filter((a) => a.stripeAccountId !== stripeAccountId));
    }
    setDisconnecting(null);
  }

  async function openBillingPortal() {
    setBillingLoading(true);
    const res = await fetch("/api/billing/portal", { method: "POST" });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    setBillingLoading(false);
  }

  async function upgradePlan(plan: string) {
    const res = await fetch("/api/billing/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  }

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Settings</h1>

      {successMsg === "stripe_connected" && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-800 rounded-lg px-4 py-3 text-sm">
          ✅ Stripe account connected successfully!
        </div>
      )}
      {errorMsg && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-800 rounded-lg px-4 py-3 text-sm">
          ❌ {errorMsg.replace(/_/g, " ")}
        </div>
      )}

      {/* Stripe Connect */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-semibold text-slate-900">Connected Stripe Accounts</h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Recharged manages trials on behalf of these accounts.
            </p>
          </div>
          <a
            href="/api/stripe/connect"
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition"
          >
            + Connect Stripe
          </a>
        </div>

        {loading ? (
          <div className="text-slate-400 text-sm py-4">Loading...</div>
        ) : accounts.length === 0 ? (
          <div className="border border-dashed border-slate-300 rounded-lg p-8 text-center text-slate-400 text-sm">
            No Stripe accounts connected yet.
            <br />
            Click &ldquo;Connect Stripe&rdquo; to get started in 5 minutes.
          </div>
        ) : (
          <div className="space-y-3">
            {accounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between p-4 border border-slate-200 rounded-lg"
              >
                <div>
                  <div className="font-medium text-slate-900">
                    {account.accountName ?? account.stripeAccountId}
                  </div>
                  <div className="text-sm text-slate-500 flex items-center gap-2 mt-0.5">
                    <span className="font-mono">{account.stripeAccountId}</span>
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded ${account.livemode ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}
                    >
                      {account.livemode ? "Live" : "Test"}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => disconnect(account.stripeAccountId)}
                  disabled={disconnecting === account.stripeAccountId}
                  className="text-sm text-red-500 hover:text-red-700 transition disabled:opacity-60"
                >
                  {disconnecting === account.stripeAccountId ? "Disconnecting..." : "Disconnect"}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Recharged Billing */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <h2 className="font-semibold text-slate-900 mb-1">Recharged Plan</h2>
        <p className="text-sm text-slate-500 mb-6">
          Upgrade to unlock higher trial volumes and advanced features.
        </p>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            {
              plan: "STARTER",
              name: "Starter",
              price: "$49/mo",
              features: ["Up to 500 trials/mo", "AI optimization", "Fraud shield"],
            },
            {
              plan: "GROWTH",
              name: "Growth",
              price: "$149/mo",
              features: ["Up to 2,000 trials/mo", "Priority support", "Custom webhook"],
              popular: true,
            },
            {
              plan: "ENTERPRISE",
              name: "Enterprise",
              price: "$499/mo",
              features: ["Unlimited trials", "Dedicated support", "SLA guarantee"],
            },
          ].map((tier) => (
            <div
              key={tier.plan}
              className={`border rounded-xl p-4 ${tier.popular ? "border-purple-400 ring-1 ring-purple-200" : "border-slate-200"}`}
            >
              {tier.popular && (
                <div className="text-xs text-purple-600 font-medium mb-2">Most Popular</div>
              )}
              <div className="font-semibold text-slate-900 mb-0.5">{tier.name}</div>
              <div className="text-2xl font-bold text-purple-600 mb-3">{tier.price}</div>
              <ul className="space-y-1 mb-4">
                {tier.features.map((f) => (
                  <li key={f} className="text-xs text-slate-600 flex items-center gap-1">
                    <span className="text-green-500">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => upgradePlan(tier.plan)}
                className="w-full py-1.5 text-xs font-medium border border-purple-300 text-purple-600 hover:bg-purple-50 rounded-lg transition"
              >
                Choose {tier.name}
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={openBillingPortal}
          disabled={billingLoading}
          className="text-sm text-slate-500 hover:text-slate-900 underline transition"
        >
          {billingLoading ? "Opening portal..." : "Manage billing & invoices →"}
        </button>
      </section>

      {/* Embed snippet */}
      {accounts.length > 0 && (
        <section className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900 mb-2">Embed Code</h2>
          <p className="text-sm text-slate-500 mb-4">
            Add this iframe to your pricing/trial page. It handles card collection, fraud check, and pre-auth hold automatically.
          </p>
          <div className="bg-slate-900 rounded-lg p-4 text-sm font-mono text-green-400 overflow-x-auto whitespace-pre">
            {`<iframe\n  src="${process.env.NEXT_PUBLIC_APP_URL ?? "https://app.recharged.io"}/widget/${accounts[0].id}"\n  width="100%"\n  height="520"\n  frameborder="0"\n  style="border-radius:12px"\n/>`}
          </div>
        </section>
      )}
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Suspense>
      <SettingsContent />
    </Suspense>
  );
}
