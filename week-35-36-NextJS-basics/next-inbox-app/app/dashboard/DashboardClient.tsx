// app/dashboard/DashboardClient.tsx
"use client";

import { useMessages } from "../hooks/useMessages";
import { MessageType } from "../hooks/useMessages";

export default function DashboardClient() {
  const { messages, loadMore, loading, hasMore } = useMessages();

  return (
    <div className="mx-auto my-4 max-w-lg space-y-4 p-6 flex flex-col gap-3 shadow-2xl rounded-md">
      <h1 className="text-xl font-bold">Inbox</h1>

      <ul className="space-y-2">
        {messages.map((m: MessageType) => (
          <li key={m.createdAt} className="border p-2">
            {m.content}
          </li>
        ))}
      </ul>

      {hasMore && (
        <button
          onClick={loadMore}
          disabled={loading}
          className="w-full rounded bg-blue-600 p-2 text-white cursor-pointer"
        >
          {loading ? "Loading..." : "More"}
        </button>
      )}
    </div>
  );
}
