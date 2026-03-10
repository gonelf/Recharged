import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

async function getMetrics(userId: string) {
  const accounts = await prisma.stripeAccount.findMany({
    where: { userId },
    select: { id: true },
  });
  const accountIds = accounts.map((a) => a.id);

  if (accountIds.length === 0) return null;

  const groups = await prisma.trial.groupBy({
    by: ["status"],
    where: { stripeAccountId: { in: accountIds } },
    _count: { id: true },
    _sum: { amountCents: true },
  });

  const counts = Object.fromEntries(
    groups.map((g) => [g.status, { count: g._count.id, revenue: g._sum.amountCents ?? 0 }])
  );

  const total = groups.reduce((s, g) => s + g._count.id, 0);
  const converted = counts["CONVERTED"]?.count ?? 0;

  return {
    totalTrials: total,
    activeTrials: counts["AUTHORIZED"]?.count ?? 0,
    convertedTrials: converted,
    canceledTrials: counts["CANCELED"]?.count ?? 0,
    totalRevenueCents: counts["CONVERTED"]?.revenue ?? 0,
    conversionRate: total > 0 ? Math.round((converted / total) * 1000) / 10 : 0,
  };
}

export default async function DashboardPage() {
  const session = await getAuthSession();
  const metrics = await getMetrics(session!.user.id);

  const accounts = await prisma.stripeAccount.findMany({
    where: { userId: session!.user.id },
    select: { id: true, accountName: true, livemode: true },
  });

  if (accounts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <div className="text-6xl mb-4">🔌</div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Connect your Stripe account
        </h2>
        <p className="text-slate-600 mb-6 max-w-sm">
          Link your Stripe account to start capturing trials with 0% failed payments.
        </p>
        <Link
          href="/settings"
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition"
        >
          Go to Settings →
        </Link>
      </div>
    );
  }

  const cards = [
    {
      label: "Conversion Rate",
      value: `${metrics?.conversionRate ?? 0}%`,
      sub: "trial → paid",
      color: "text-purple-600",
    },
    {
      label: "Active Trials",
      value: metrics?.activeTrials ?? 0,
      sub: "authorization holds",
      color: "text-blue-600",
    },
    {
      label: "Converted",
      value: metrics?.convertedTrials ?? 0,
      sub: "paying customers",
      color: "text-green-600",
    },
    {
      label: "Revenue Captured",
      value: formatCurrency(metrics?.totalRevenueCents ?? 0),
      sub: "total from conversions",
      color: "text-emerald-600",
    },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">
            {accounts.map((a) => a.accountName ?? a.id).join(", ")}
          </p>
        </div>
        <Link
          href="/trials"
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition"
        >
          View Trials
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="text-sm text-slate-500 mb-1">{card.label}</div>
            <div className={`text-3xl font-bold ${card.color} mb-1`}>
              {card.value}
            </div>
            <div className="text-xs text-slate-400">{card.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick actions */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {[
              { href: "/trials", label: "Manage active trials", icon: "⚡" },
              { href: "/optimize", label: "Optimize with AI", icon: "🤖" },
              { href: "/fraud", label: "Review fraud blocklist", icon: "🛡️" },
              { href: "/analytics", label: "View full analytics", icon: "📈" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-50 transition border border-slate-100"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-medium text-slate-700">{item.label}</span>
                <span className="ml-auto text-slate-400">→</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Embed snippet */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900 mb-2">Embed Widget</h2>
          <p className="text-sm text-slate-500 mb-4">
            Add this to your pricing page to start capturing trials with pre-auth holds.
          </p>
          <div className="bg-slate-900 rounded-lg p-4 text-sm font-mono text-green-400 overflow-x-auto">
            {`<iframe\n  src="${process.env.NEXT_PUBLIC_APP_URL ?? "https://app.recharged.io"}/widget/${accounts[0]?.id}"\n  width="100%"\n  height="500"\n  frameborder="0"\n/>`}
          </div>
        </div>
      </div>
    </div>
  );
}
