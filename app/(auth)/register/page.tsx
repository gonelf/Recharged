"use client";

import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold">
            <span className="text-purple-600">Re</span>acquire
          </Link>
          <p className="text-slate-600 mt-2">Create your account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <div className="mb-6 text-center">
            <p className="text-slate-700 text-sm">
              Connect your Stripe account to get started. We&apos;ll create your
              Reacquire account automatically.
            </p>
          </div>

          <a
            href="/api/stripe/connect?mode=auth"
            className="flex items-center justify-center gap-3 w-full py-3 bg-[#635BFF] hover:bg-[#5851ea] text-white font-medium rounded-lg transition"
          >
            {/* Stripe "S" mark */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 14 21"
              className="h-5 w-auto"
              aria-hidden="true"
            >
              <path
                fill="white"
                d="M6.5 8.8C4 8.2 3.2 7.6 3.2 6.6c0-1.1 1-1.9 2.8-1.9 1.9 0 2.6.9 2.7 2.3h2.4C11 4.9 9.7 3.3 7.5 2.8V.5H4.6v2.3C2.3 3.3.6 4.9.6 7c0 2.5 2.1 3.8 5.1 4.5 2.8.6 3.3 1.5 3.3 2.5 0 .7-.5 1.9-2.8 1.9-2.1 0-3-.9-3.1-2.3H.6c.1 2.4 1.9 3.8 4 4.3V20h2.9v-2.3c2.3-.4 4-1.9 4-4.1 0-3.1-2.7-4.2-5-4.8z"
              />
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
