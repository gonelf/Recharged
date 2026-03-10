import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { formatCurrency, formatDate } from "@/lib/utils";
import { TrialActions } from "@/components/trials/TrialActions";
import Link from "next/link";

const STATUS_STYLES: Record<string, string> = {
  AUTHORIZED: "bg-blue-100 text-blue-700",
  CONVERTED: "bg-green-100 text-green-700",
  CANCELED: "bg-slate-100 text-slate-600",
  EXPIRED: "bg-amber-100 text-amber-700",
  FAILED: "bg-red-100 text-red-700",
};

export default async function TrialDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getAuthSession();
  const { id } = await params;

  const accounts = await prisma.stripeAccount.findMany({
    where: { userId: session!.user.id },
    select: { id: true },
  });
  const accountIds = accounts.map((a) => a.id);

  const trial = await prisma.trial.findFirst({
    where: { id, stripeAccountId: { in: accountIds } },
    include: {
      stripeAccount: { select: { accountName: true, stripeAccountId: true } },
      events: { orderBy: { createdAt: "asc" } },
    },
  });

  if (!trial) notFound();

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/trials" className="text-slate-400 hover:text-slate-600 text-sm">
          ← Trials
        </Link>
        <span className="text-slate-300">/</span>
        <span className="text-sm text-slate-600 font-mono">{trial.id}</span>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              {trial.customerName ?? trial.customerEmail}
            </h1>
            <p className="text-slate-500 text-sm">{trial.customerEmail}</p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${STATUS_STYLES[trial.status]}`}
            >
              {trial.status}
            </span>
            {trial.status === "AUTHORIZED" && (
              <TrialActions trialId={trial.id} />
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Amount", value: formatCurrency(trial.amountCents, trial.currency) },
            { label: "Trial Ends", value: formatDate(trial.trialEndsAt) },
            { label: "Created", value: formatDate(trial.createdAt) },
            { label: "Payment Intent", value: trial.paymentIntentId },
            { label: "Stripe Account", value: trial.stripeAccount.accountName ?? trial.stripeAccount.stripeAccountId },
            { label: "Source", value: trial.utmSource ?? "—" },
          ].map((item) => (
            <div key={item.label}>
              <div className="text-xs text-slate-400 mb-0.5">{item.label}</div>
              <div className="text-sm font-medium text-slate-900 font-mono break-all">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event timeline */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="font-semibold text-slate-900 mb-4">Event Timeline</h2>
        {trial.events.length === 0 ? (
          <p className="text-sm text-slate-400">No events recorded.</p>
        ) : (
          <div className="space-y-3">
            {trial.events.map((event) => (
              <div key={event.id} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-400 mt-1.5 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-slate-700">
                    {event.eventType.replace(/_/g, " ")}
                  </div>
                  <div className="text-xs text-slate-400">
                    {formatDate(event.createdAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
