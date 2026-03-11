"use client";

import { useEffect, useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const stripeToken = searchParams.get("stripe_token");
    const error = searchParams.get("error");

    if (error === "stripe_connect_failed") {
      setErrorMsg("Stripe connection failed. Please try again.");
      return;
    }

    if (stripeToken) {
      setStatus("loading");
      signIn("credentials", { stripeToken, redirect: false }).then((result) => {
        if (result?.error) {
          setStatus("error");
          setErrorMsg("Authentication failed. Please try again.");
        } else {
          router.push("/dashboard");
        }
      });
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold">
            <span className="text-purple-600">Re</span>acquire
          </Link>
          <p className="text-slate-600 mt-2">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          {status === "loading" ? (
            <div className="text-center py-4">
              <div className="inline-block w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mb-3" />
              <p className="text-slate-600 text-sm">Signing you in...</p>
            </div>
          ) : (
            <>
              {(status === "error" || errorMsg) && (
                <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2 mb-4">
                  {errorMsg}
                </p>
              )}

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
                Continue with Stripe
              </a>

              <p className="text-center text-xs text-slate-500 mt-4">
                New users will have an account created automatically.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}
