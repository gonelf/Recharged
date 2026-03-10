export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { subDays, startOfDay } from "date-fns";

// GET /api/analytics – aggregated metrics for the dashboard
export async function GET(request: NextRequest) {
  const session = await getAuthSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const accountId = searchParams.get("accountId");
  const days = parseInt(searchParams.get("days") ?? "30", 10);

  const accounts = await prisma.stripeAccount.findMany({
    where: { userId: session.user.id },
    select: { id: true },
  });
  const accountIds = accounts.map((a) => a.id);
  const filteredIds = accountId
    ? accountIds.filter((id) => id === accountId)
    : accountIds;

  const since = startOfDay(subDays(new Date(), days));

  const [trials, recentTrials] = await Promise.all([
    // All-time summary
    prisma.trial.groupBy({
      by: ["status"],
      where: { stripeAccountId: { in: filteredIds } },
      _count: { id: true },
      _sum: { amountCents: true },
    }),
    // Recent trials for time-series chart
    prisma.trial.findMany({
      where: {
        stripeAccountId: { in: filteredIds },
        createdAt: { gte: since },
      },
      select: {
        id: true,
        status: true,
        amountCents: true,
        createdAt: true,
        convertedAt: true,
      },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  // Build summary counts
  const counts = Object.fromEntries(
    trials.map((g) => [
      g.status,
      { count: g._count.id, revenue: g._sum.amountCents ?? 0 },
    ])
  );

  const totalTrials = trials.reduce((sum, g) => sum + g._count.id, 0);
  const converted = counts["CONVERTED"]?.count ?? 0;
  const authorized = counts["AUTHORIZED"]?.count ?? 0;
  const canceled = counts["CANCELED"]?.count ?? 0;
  const failed = counts["FAILED"]?.count ?? 0;
  const totalRevenue = counts["CONVERTED"]?.revenue ?? 0;
  const conversionRate =
    totalTrials > 0 ? Math.round((converted / totalTrials) * 100 * 10) / 10 : 0;

  // Time-series: group by day
  const dailyMap: Record<
    string,
    { date: string; started: number; converted: number; revenue: number }
  > = {};

  for (const trial of recentTrials) {
    const dateKey = trial.createdAt.toISOString().slice(0, 10);
    if (!dailyMap[dateKey]) {
      dailyMap[dateKey] = { date: dateKey, started: 0, converted: 0, revenue: 0 };
    }
    dailyMap[dateKey].started++;
    if (trial.status === "CONVERTED") {
      dailyMap[dateKey].converted++;
      dailyMap[dateKey].revenue += trial.amountCents;
    }
  }

  const timeSeries = Object.values(dailyMap).sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  // Fraud events count
  const fraudBlocked = await prisma.conversionEvent.count({
    where: {
      stripeAccountId: { in: filteredIds },
      eventType: "fraud_blocked",
      createdAt: { gte: since },
    },
  });

  return NextResponse.json({
    summary: {
      totalTrials,
      activeTrials: authorized,
      convertedTrials: converted,
      canceledTrials: canceled,
      failedTrials: failed,
      conversionRate,
      totalRevenueCents: totalRevenue,
      fraudBlocked,
    },
    timeSeries,
  });
}
