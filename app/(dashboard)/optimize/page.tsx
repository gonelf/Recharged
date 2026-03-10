"use client";

import { useEffect, useState } from "react";

interface PageVariant {
  id: string;
  name: string;
  headline: string;
  ctaText: string;
  bodyText: string | null;
  badgeText: string | null;
  rationale: string | null;
  isActive: boolean;
  impressions: number;
  conversions: number;
  createdAt: string;
}

interface StripeAccount {
  id: string;
  accountName: string | null;
}

export default function OptimizePage() {
  const [accounts, setAccounts] = useState<StripeAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [variants, setVariants] = useState<PageVariant[]>([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  // Form state
  const [form, setForm] = useState({
    productName: "",
    currentHeadline: "",
    currentCta: "",
    currentBody: "",
    trialDays: 14,
    price: 4900,
    recentConversionRate: "",
  });

  useEffect(() => {
    fetch("/api/stripe/accounts")
      .then((r) => r.json())
      .then((data: StripeAccount[]) => {
        setAccounts(data);
        if (data.length > 0) setSelectedAccount(data[0].id);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!selectedAccount) return;
    setLoading(true);
    fetch(`/api/optimize?accountId=${selectedAccount}`)
      .then((r) => r.json())
      .then((data: PageVariant[]) => setVariants(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, [selectedAccount]);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedAccount) return;
    setGenerating(true);

    const res = await fetch("/api/optimize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        stripeAccountId: selectedAccount,
        ...form,
        price: form.price,
        trialDays: Number(form.trialDays),
        recentConversionRate: form.recentConversionRate
          ? Number(form.recentConversionRate)
          : undefined,
      }),
    });

    if (res.ok) {
      const newVariants = await res.json();
      setVariants((prev) => [...newVariants, ...prev]);
    } else {
      alert("Generation failed. Check your API key.");
    }
    setGenerating(false);
  }

  async function activateVariant(variantId: string) {
    const res = await fetch(`/api/optimize/${variantId}/activate`, {
      method: "POST",
    });
    if (res.ok) {
      setVariants((prev) =>
        prev.map((v) => ({ ...v, isActive: v.id === variantId }))
      );
    }
  }

  const conversionRate = (v: PageVariant) =>
    v.impressions > 0
      ? ((v.conversions / v.impressions) * 100).toFixed(1)
      : "—";

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">AI Optimizer</h1>
      <p className="text-slate-500 text-sm mb-8">
        Claude analyzes your current trial page and generates optimized copy variants.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Generate form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="font-semibold text-slate-900 mb-4">Generate Variants</h2>
            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Stripe Account
                </label>
                <select
                  value={selectedAccount}
                  onChange={(e) => setSelectedAccount(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {accounts.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.accountName ?? a.id}
                    </option>
                  ))}
                </select>
              </div>

              {[
                { key: "productName", label: "Product Name", placeholder: "Acme SaaS" },
                { key: "currentHeadline", label: "Current Headline", placeholder: "Start your free trial" },
                { key: "currentCta", label: "Current CTA", placeholder: "Try for Free" },
                { key: "currentBody", label: "Current Body Copy (optional)", placeholder: "No credit card required..." },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    {label}
                  </label>
                  <input
                    type="text"
                    value={form[key as keyof typeof form]}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, [key]: e.target.value }))
                    }
                    placeholder={placeholder}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              ))}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Trial Days
                  </label>
                  <input
                    type="number"
                    value={form.trialDays}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, trialDays: Number(e.target.value) }))
                    }
                    min={1}
                    max={90}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Price (cents)
                  </label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, price: Number(e.target.value) }))
                    }
                    min={100}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Current Conversion Rate % (optional)
                </label>
                <input
                  type="number"
                  value={form.recentConversionRate}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, recentConversionRate: e.target.value }))
                  }
                  placeholder="e.g. 12"
                  min={0}
                  max={100}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <button
                type="submit"
                disabled={generating || !selectedAccount || !form.productName || !form.currentHeadline}
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition disabled:opacity-60"
              >
                {generating ? "Generating with Claude..." : "Generate 3 Variants"}
              </button>
            </form>
          </div>
        </div>

        {/* Variants list */}
        <div className="lg:col-span-2">
          <h2 className="font-semibold text-slate-900 mb-4">
            Saved Variants ({variants.length})
          </h2>
          {loading ? (
            <div className="text-slate-400 text-sm">Loading variants...</div>
          ) : variants.length === 0 ? (
            <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center text-slate-400 text-sm">
              No variants yet. Generate your first set above.
            </div>
          ) : (
            <div className="space-y-4">
              {variants.map((v) => (
                <div
                  key={v.id}
                  className={`bg-white rounded-xl border p-5 ${v.isActive ? "border-purple-400 ring-1 ring-purple-200" : "border-slate-200"}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900">{v.name}</span>
                        {v.isActive && (
                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">
                            Active
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {v.impressions} impressions · {v.conversions} conversions ·{" "}
                        {conversionRate(v)}% CVR
                      </div>
                    </div>
                    {!v.isActive && (
                      <button
                        onClick={() => activateVariant(v.id)}
                        className="text-xs px-3 py-1.5 border border-purple-300 text-purple-600 hover:bg-purple-50 rounded-lg transition"
                      >
                        Activate
                      </button>
                    )}
                  </div>

                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-slate-400 text-xs">Headline</span>
                      <p className="font-medium text-slate-900">{v.headline}</p>
                    </div>
                    <div className="flex gap-4">
                      <div>
                        <span className="text-slate-400 text-xs">CTA</span>
                        <p className="font-medium">{v.ctaText}</p>
                      </div>
                      {v.badgeText && (
                        <div>
                          <span className="text-slate-400 text-xs">Badge</span>
                          <p className="font-medium">{v.badgeText}</p>
                        </div>
                      )}
                    </div>
                    {v.bodyText && (
                      <div>
                        <span className="text-slate-400 text-xs">Body</span>
                        <p className="text-slate-700">{v.bodyText}</p>
                      </div>
                    )}
                    {v.rationale && (
                      <div className="bg-amber-50 rounded-lg px-3 py-2">
                        <span className="text-xs font-medium text-amber-700">
                          Claude&apos;s rationale:
                        </span>
                        <p className="text-xs text-amber-800 mt-0.5">{v.rationale}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
