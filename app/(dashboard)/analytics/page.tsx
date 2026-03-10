"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { formatCurrency } from "@/lib/utils";

interface AnalyticsData {
  summary: {
    totalTrials: number;
    activeTrials: number;
    convertedTrials: number;
    canceledTrials: number;
    failedTrials: number;
    conversionRate: number;
    totalRevenueCents: number;
    fraudBlocked: number;
  };
  timeSeries: Array<{
    date: string;
    started: number;
    converted: number;
    revenue: number;
  }>;
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/analytics?days=${days}`)
      .then((r) => r.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [days]);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
        <select
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value={7}>Last 7 days</option>
          <option value={30}>Last 30 days</option>
          <option value={90}>Last 90 days</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-16 text-slate-400">Loading analytics...</div>
      ) : !data ? (
        <div className="text-center py-16 text-slate-400">No data available</div>
      ) : (
        <>
          {/* Summary cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              {
                label: "Conversion Rate",
                value: `${data.summary.conversionRate}%`,
                color: "text-purple-600",
              },
              {
                label: "Revenue Captured",
                value: formatCurrency(data.summary.totalRevenueCents),
                color: "text-green-600",
              },
              {
                label: "Total Trials",
                value: data.summary.totalTrials,
                color: "text-slate-900",
              },
              {
                label: "Fraud Blocked",
                value: data.summary.fraudBlocked,
                color: "text-red-600",
              },
            ].map((card) => (
              <div key={card.label} className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="text-sm text-slate-500 mb-1">{card.label}</div>
                <div className={`text-3xl font-bold ${card.color}`}>{card.value}</div>
              </div>
            ))}
          </div>

          {/* Trial funnel */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="font-semibold text-slate-900 mb-4">Trial Funnel</h2>
              <div className="space-y-3">
                {[
                  { label: "Trials Started", value: data.summary.totalTrials, color: "bg-slate-200" },
                  { label: "Currently Active", value: data.summary.activeTrials, color: "bg-blue-200" },
                  { label: "Converted to Paid", value: data.summary.convertedTrials, color: "bg-green-200" },
                  { label: "Canceled", value: data.summary.canceledTrials, color: "bg-slate-100" },
                  { label: "Failed (card declined)", value: data.summary.failedTrials, color: "bg-red-100" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2 rounded-full ${item.color}`}
                        style={{
                          width: `${Math.max(4, (item.value / Math.max(1, data.summary.totalTrials)) * 120)}px`,
                        }}
                      />
                      <span className="text-sm font-semibold text-slate-900 w-8 text-right">
                        {item.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="font-semibold text-slate-900 mb-4">
                Daily Conversions
              </h2>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data.timeSeries}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11 }}
                    tickFormatter={(v) => v.slice(5)}
                  />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="started" fill="#e2e8f0" name="Started" />
                  <Bar dataKey="converted" fill="#7c3aed" name="Converted" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Revenue over time */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="font-semibold text-slate-900 mb-4">Revenue Over Time</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data.timeSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11 }}
                  tickFormatter={(v) => v.slice(5)}
                />
                <YAxis
                  tick={{ fontSize: 11 }}
                  tickFormatter={(v) => `$${(v / 100).toFixed(0)}`}
                />
                <Tooltip
                  formatter={(v: number) => formatCurrency(v)}
                  labelFormatter={(l) => `Date: ${l}`}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#7c3aed"
                  strokeWidth={2}
                  dot={false}
                  name="Revenue"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}
