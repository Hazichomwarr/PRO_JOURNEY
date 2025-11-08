//pages/dashboard/Messages.tsx
import { useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import { useMessagesStore } from "../../store/messagesStore";

//Pages/dashboard/Messages.tsx
export default function Messages() {
  const user = useAuthStore((s) => s.user);

  const { messages, fetchMessages, markAsRead, isLoading } = useMessagesStore();
  //auto-fetch Logged in user (coach) messages right away
  useEffect(() => {
    fetchMessages();
  }, [user]);

  if (isLoading) return <p>Loading messages...</p>;
  if (!messages.length) return <p>No messages yet.</p>;

  return (
    <div>
      <h2>Inbox ({messages.filter((m) => !m.isRead).length} unread)</h2>

      <ul className="space-y-3">
        {messages.map((msg) => (
          <li
            key={msg.id}
            onClick={() => markAsRead(msg.id)}
            className={``}
          ></li>
        ))}
      </ul>
    </div>
  );
}
