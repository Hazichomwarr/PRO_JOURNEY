"use client";

import { useCreateMessage } from "@/app/hooks/useCreateMessage";

export default function ComposePage() {
  const { createMessage, loading, error } = useCreateMessage();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const content = form.get("content")?.toString();

    if (!content) return;

    createMessage(content);
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-20 max-w-sm space-y-4">
      <textarea
        name="content"
        required
        className="w-full border p-2"
        placeholder="Type a message…"
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        disabled={loading}
        className="w-full rounded bg-blue-600 p-2 text-white"
      >
        {loading ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
