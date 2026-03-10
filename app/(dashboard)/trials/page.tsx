import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate, trialDaysRemaining } from "@/lib/utils";
import { TrialActions } from "@/components/trials/TrialActions";
import Link from "next/link";

const STATUS_STYLES: Record<string, string> = {
  AUTHORIZED: "bg-blue-100 text-blue-700",
  CONVERTED: "bg-green-100 text-green-700",
  CANCELED: "bg-slate-100 text-slate-600",
  EXPIRED: "bg-amber-100 text-amber-700",
  FAILED: "bg-red-100 text-red-700",
};

export default async function TrialsPage() {
  const session = await getAuthSession();

  const accounts = await prisma.stripeAccount.findMany({
    where: { userId: session!.user.id },
    select: { id: true },
  });
  const accountIds = accounts.map((a) => a.id);

  const trials = await prisma.trial.findMany({
    where: { stripeAccountId: { in: accountIds } },
    include: {
      stripeAccount: { select: { accountName: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Trials</h1>
        <div className="text-sm text-slate-500">
          {trials.length} trials total
        </div>
      </div>

      {trials.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <div className="text-4xl mb-3">⚡</div>
          <h3 className="font-semibold text-slate-900 mb-1">No trials yet</h3>
          <p className="text-slate-500 text-sm">
            Embed the widget on your site to start capturing trials.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Customer</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Amount</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Status</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Trial Ends</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Created</th>
                <th className="px-4 py-3 text-right font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {trials.map((trial) => (
                <tr key={trial.id} className="hover:bg-slate-50 transition">
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-900">
                      {trial.customerName ?? trial.customerEmail}
                    </div>
                    {trial.customerName && (
                      <div className="text-slate-400 text-xs">{trial.customerEmail}</div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium">
                    {formatCurrency(trial.amountCents, trial.currency)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[trial.status] ?? ""}`}
                    >
                      {trial.status === "AUTHORIZED" && (
                        <span className="mr-1 text-xs">
                          {trialDaysRemaining(trial.trialEndsAt)}d left
                        </span>
                      )}
                      {trial.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {formatDate(trial.trialEndsAt)}
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {formatDate(trial.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/trials/${trial.id}`}
                        className="text-xs text-slate-500 hover:text-slate-900 px-2 py-1 rounded hover:bg-slate-100 transition"
                      >
                        View
                      </Link>
                      {trial.status === "AUTHORIZED" && (
                        <TrialActions trialId={trial.id} />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
