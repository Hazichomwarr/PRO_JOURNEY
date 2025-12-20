export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { Message } from "@prisma/client";

async function getMessages() {
  const res = await fetch("http://localhost:3000/api/messages", {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to load messages");
  return res.json();
}

export default async function MessagesPage() {
  const messages = await getMessages();

  return (
    <ul className="space-y-2">
      {messages.map((m: Message) => (
        <li key={m.id} className="border p-2">
          {m.content}
        </li>
      ))}
    </ul>
  );
}
