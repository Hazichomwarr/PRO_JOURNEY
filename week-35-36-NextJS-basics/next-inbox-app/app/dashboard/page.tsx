// app/dashboard/page.tsx
import { getSession } from "../lib/auth";
import { redirect } from "next/navigation";
// import { getMessages } from "../lib/db";

export default async function DashboardPage() {
  const session = getSession();

  if (!session) {
    redirect("/login");
  }
  //   const messages = getMessages();

  return (
    <div className="mx-auto max-w-lg space-y-4 p-6">
      <h1 className="text-xl font-bold">Inbox</h1>

      <ul className="space-y-2">
        {messages.map((m) => (
          <li key={m.id} className="rounded border p-2">
            {m.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
