"use client";

import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold">
            <span className="text-purple-600">Re</span>charged
          </Link>
          <p className="text-slate-600 mt-2">Create your account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <div className="mb-6 text-center">
            <p className="text-slate-700 text-sm">
              Connect your Stripe account to get started. We&apos;ll create your
              Recharged account automatically.
            </p>
          </div>

          <a
            href="/api/stripe/connect?mode=auth"
            className="flex items-center justify-center gap-3 w-full py-3 bg-[#635BFF] hover:bg-[#5851ea] text-white font-medium rounded-lg transition"
          >
            <svg
              viewBox="0 0 60 25"
              className="h-5 w-auto fill-white"
              aria-hidden="true"
            >
              <path d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a12.08 12.08 0 0 1-4.56.83c-4.08 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04 1.26-.06 1.75zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.25c0-1.85-1.07-2.58-2.08-2.58zM40.95 20c-1.29 0-2.17-.5-2.71-1.28L38 20h-3.65V5.3h4.28v3.63c.56-.77 1.43-1.27 2.72-1.27 2.73 0 5.38 2.38 5.38 6.16C46.73 17.62 44.17 20 40.95 20zm-.7-8.86c-1.28 0-2.1 1.02-2.1 2.86 0 1.85.82 2.87 2.1 2.87 1.28 0 2.1-1.02 2.1-2.87 0-1.84-.82-2.86-2.1-2.86zM28.5 7.67V5.3h-4.28V20H28.5v-7.5c0-1.56.78-2.16 2.44-2.16h.5V5.76a4.5 4.5 0 0 0-.5-.03c-1.1 0-2.2.42-2.44 1.94zM19.13 6.03a2.16 2.16 0 0 0-2.16-2.17 2.16 2.16 0 0 0-2.16 2.17c0 1.2.97 2.16 2.16 2.16a2.16 2.16 0 0 0 2.16-2.16zM14.95 20V7.84h4.28V20h-4.28zM12.16 7.84H7.88V5.3H3.6V20h4.28v-8.53h4.28V20h4.28V7.84h-4.28z" />
            </svg>
            Connect with Stripe
          </a>

          <p className="text-center text-xs text-slate-500 mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-purple-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
