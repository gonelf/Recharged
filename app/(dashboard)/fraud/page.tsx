"use client";

import { useEffect, useState } from "react";

interface BlocklistEntry {
  id: string;
  type: "EMAIL" | "IP" | "CARD_FINGERPRINT";
  value: string;
  reason: string | null;
  createdAt: string;
}

const TYPE_LABELS: Record<string, string> = {
  EMAIL: "Email",
  IP: "IP Address",
  CARD_FINGERPRINT: "Card Fingerprint",
};

export default function FraudPage() {
  const [entries, setEntries] = useState<BlocklistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [accountId, setAccountId] = useState("");
  const [accounts, setAccounts] = useState<{ id: string; accountName: string | null }[]>([]);

  // New entry form
  const [form, setForm] = useState({
    type: "EMAIL" as "EMAIL" | "IP" | "CARD_FINGERPRINT",
    value: "",
    reason: "",
  });
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetch("/api/stripe/accounts")
      .then((r) => r.json())
      .then((data: { id: string; accountName: string | null }[]) => {
        setAccounts(data);
        if (data.length > 0) setAccountId(data[0].id);
      });
  }, []);

  useEffect(() => {
    if (!accountId) return;
    setLoading(true);
    fetch(`/api/fraud/blocklist?accountId=${accountId}`)
      .then((r) => r.json())
      .then((data: BlocklistEntry[]) => setEntries(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, [accountId]);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!accountId) return;
    setAdding(true);

    const res = await fetch("/api/fraud/blocklist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stripeAccountId: accountId, ...form }),
    });

    if (res.ok) {
      const entry = await res.json();
      setEntries((prev) => [entry, ...prev]);
      setForm({ type: "EMAIL", value: "", reason: "" });
    }
    setAdding(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Remove this entry from the blocklist?")) return;
    const res = await fetch(`/api/fraud/blocklist?id=${id}`, { method: "DELETE" });
    if (res.ok) setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Fraud Shield</h1>
          <p className="text-slate-500 text-sm mt-1">
            Block known bad actors before they start a trial. Combined with Stripe Radar for full coverage.
          </p>
        </div>
        <select
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
          className="px-3 py-2 text-sm border border-slate-300 rounded-lg"
        >
          {accounts.map((a) => (
            <option key={a.id} value={a.id}>
              {a.accountName ?? a.id}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="font-semibold text-slate-900 mb-4">Add to Blocklist</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Type</label>
                <select
                  value={form.type}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, type: e.target.value as typeof form.type }))
                  }
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="EMAIL">Email</option>
                  <option value="IP">IP Address</option>
                  <option value="CARD_FINGERPRINT">Card Fingerprint</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Value</label>
                <input
                  type="text"
                  value={form.value}
                  onChange={(e) => setForm((f) => ({ ...f, value: e.target.value }))}
                  required
                  placeholder={form.type === "EMAIL" ? "bad@actor.com" : form.type === "IP" ? "1.2.3.4" : "fingerprint_xxx"}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Reason (optional)</label>
                <input
                  type="text"
                  value={form.reason}
                  onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value }))}
                  placeholder="Serial chargeback disputer"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button
                type="submit"
                disabled={adding || !form.value || !accountId}
                className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition disabled:opacity-60"
              >
                {adding ? "Adding..." : "Add to Blocklist"}
              </button>
            </form>
          </div>
        </div>

        {/* Table */}
        <div className="lg:col-span-2">
          <h2 className="font-semibold text-slate-900 mb-4">
            Blocklist ({entries.length} entries)
          </h2>
          {loading ? (
            <div className="text-slate-400 text-sm">Loading...</div>
          ) : entries.length === 0 ? (
            <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center text-slate-400 text-sm">
              No blocklist entries. Stripe Radar also runs automatically on every signup.
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-slate-600">Type</th>
                    <th className="px-4 py-3 text-left font-medium text-slate-600">Value</th>
                    <th className="px-4 py-3 text-left font-medium text-slate-600">Reason</th>
                    <th className="px-4 py-3 text-right font-medium text-slate-600"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {entries.map((entry) => (
                    <tr key={entry.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                          {TYPE_LABELS[entry.type]}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-slate-700">{entry.value}</td>
                      <td className="px-4 py-3 text-slate-500">{entry.reason ?? "—"}</td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => handleDelete(entry.id)}
                          className="text-xs text-red-500 hover:text-red-700 transition"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
