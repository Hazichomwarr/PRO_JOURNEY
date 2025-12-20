// app/dashboard/page.tsx
import { getSession } from "../lib/auth";
import { redirect } from "next/navigation";
import { Message } from "@prisma/client"; //for the type in map loop

export default async function DashboardPage() {
  // const session = await getSession();
  // if (!session) redirect("/login");

  const res = await fetch("http://localhost:3000/api/messages", {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch messages");

  const { data: messages } = await res.json();
  console.log("messages from DB:", messages);

  return (
    <div className="mx-auto max-w-lg space-y-4 p-6">
      <h1 className="text-xl font-bold">Inbox</h1>
      <ul className="space-y-2">
        {messages.map((m: Message) => (
          <li key={m.id} className="border p-2">
            {m.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
