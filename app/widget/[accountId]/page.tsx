import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { TrialWidget } from "@/components/widget/TrialWidget";

export default async function WidgetPage({
  params,
  searchParams,
}: {
  params: Promise<{ accountId: string }>;
  searchParams: Promise<{ variantId?: string }>;
}) {
  const { accountId } = await params;
  const { variantId } = await searchParams;

  const account = await prisma.stripeAccount.findUnique({
    where: { id: accountId },
    select: {
      id: true,
      accountName: true,
      defaultTrialDays: true,
    },
  });

  if (!account) notFound();

  // Fetch active page variant (or specified one)
  const variant = variantId
    ? await prisma.pageVariant.findFirst({
        where: { id: variantId, stripeAccountId: accountId },
      })
    : await prisma.pageVariant.findFirst({
        where: { stripeAccountId: accountId, isActive: true },
      });

  return (
    <TrialWidget
      accountId={accountId}
      accountName={account.accountName}
      trialDays={account.defaultTrialDays}
      variant={variant
        ? {
            id: variant.id,
            headline: variant.headline,
            ctaText: variant.ctaText,
            bodyText: variant.bodyText,
            badgeText: variant.badgeText,
          }
        : null}
      stripePublishableKey={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
    />
  );
}
