//app/hooks/useMessages.ts
"use client";
import { useEffect, useState } from "react";

export type MessageType = {
  id: string;
  content: string;
  createdAt: string;
};

export function useMessages() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  async function loadMore() {
    if (loading || !hasMore) return;

    setLoading(true);

    const params = new URLSearchParams();
    if (cursor) params.set("cursor", cursor);

    const res = await fetch(`/api/messages?${params.toString()}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch messages");

    const data = await res.json();

    setMessages((prev) => [...prev, ...data.data]);
    setCursor(data.nextCursor);
    setHasMore(Boolean(data.nextCursor));
    setLoading(false);
  }

  // 🔥 AUTO-FETCH FIRST PAGE
  useEffect(() => {
    loadMore();
  }, []);

  return { messages, loadMore, loading, hasMore };
}
