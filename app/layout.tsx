import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Recharged – Trial-to-Paid Conversion",
  description:
    "Maximize trial-to-paid conversions with smart payment capture, AI optimization, and fraud prevention.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
