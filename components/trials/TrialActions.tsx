"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function TrialActions({ trialId }: { trialId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState<"capture" | "cancel" | null>(null);

  async function handleAction(action: "capture" | "cancel") {
    if (!confirm(`Are you sure you want to ${action} this trial?`)) return;
    setLoading(action);

    const res = await fetch(`/api/trials/${trialId}/${action}`, {
      method: "POST",
    });

    if (res.ok) {
      router.refresh();
    } else {
      const data = await res.json();
      alert(data.error ?? "Action failed");
    }
    setLoading(null);
  }

  return (
    <div className="flex gap-1">
      <button
        onClick={() => handleAction("capture")}
        disabled={loading !== null}
        className="text-xs px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded transition disabled:opacity-60"
      >
        {loading === "capture" ? "..." : "Capture"}
      </button>
      <button
        onClick={() => handleAction("cancel")}
        disabled={loading !== null}
        className="text-xs px-2 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded transition disabled:opacity-60"
      >
        {loading === "cancel" ? "..." : "Cancel"}
      </button>
    </div>
  );
}
