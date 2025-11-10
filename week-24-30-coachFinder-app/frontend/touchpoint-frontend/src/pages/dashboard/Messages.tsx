//pages/dashboard/Messages.tsx
import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { useMessagesStore } from "../../store/messagesStore";
import { ChevronDown, ChevronUp } from "lucide-react";

//Pages/dashboard/Messages.tsx
export default function Messages() {
  const user = useAuthStore((s) => s.user);

  const { messages, fetchMessages, markAsRead, isLoading } = useMessagesStore();
  const [openMessageId, setOpenMessageId] = useState<string | null>(null);

  //it works but opens all the messages open at once
  const handleOpenMessage = (id: string) => {
    setOpenMessageId((prevId) => (prevId === id ? null : id));
    if (openMessageId !== id) markAsRead(id);
  };

  //auto-fetch Logged in user (coach) messages right away
  useEffect(() => {
    if (!user?.id) return;
    fetchMessages();
  }, [user?.id]);

  if (isLoading) return <p>Loading messages...</p>;
  if (!messages.length) return <p>No messages yet.</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font semibold text-gray-700 mb-4">
        Inbox ({messages.filter((m) => !m.isRead).length} unread)
      </h2>

      <ul className="space-y-3">
        {messages.map((msg) => {
          const isOpen = openMessageId === msg._id;
          return (
            <li
              key={msg._id}
              onClick={() => handleOpenMessage(msg._id)}
              aria-expanded={isOpen}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                msg.isRead
                  ? "bg-white hover:shadow-sm"
                  : "bg-blue-50 border-blue-200 shadow-md"
              }`}
            >
              <div className="flex justify-between">
                <p className="font-semibold text-gray-700">
                  From: {msg.senderName}{" "}
                  {isOpen ? <ChevronUp /> : <ChevronDown />}
                </p>

                {msg.createdAt && (
                  <span>{new Date(msg.createdAt).toLocaleString()}</span>
                )}
              </div>
              {isOpen && (
                <p className="text-gray-600 mt-5 italic">{msg.content}</p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
