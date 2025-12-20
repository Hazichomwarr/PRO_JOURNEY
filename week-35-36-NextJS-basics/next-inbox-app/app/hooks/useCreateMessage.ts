"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function useCreateMessage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function createMessage(content: string) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(`Failed to send message: ${err}`);
    } finally {
      setLoading(false);
    }
  }

  return {
    createMessage,
    loading,
    error,
  };
}
