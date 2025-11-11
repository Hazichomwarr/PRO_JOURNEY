//pages/dashboard/Messages.tsx
import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { useMessagesStore } from "../../store/messagesStore";
import { ChevronDown, ChevronUp, Trash2Icon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

//Pages/dashboard/Messages.tsx
export default function Messages() {
  const user = useAuthStore((s) => s.user);

  const { messages, fetchMessages, markAsRead, deleteMessage, isLoading } =
    useMessagesStore();
  const [openMessageId, setOpenMessageId] = useState<string | null>(null);

  const handleOpenMessage = (id: string) => {
    setOpenMessageId((prevId) => (prevId === id ? null : id));
    if (openMessageId !== id) markAsRead(id);
  };

  // //delete message fn
  // const handleDeleteMessage = (id: string) => {
  //   deleteMessage(id);
  //   console.log("message deleted successfully!");
  // };

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
        <AnimatePresence>
          {messages.map((msg) => {
            const isOpen = openMessageId === msg._id;
            return (
              <motion.li
                className="space-y-3 flex justify-center items-center gap-4"
                key={msg._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <div
                  onClick={() => handleOpenMessage(msg._id)}
                  aria-expanded={isOpen}
                  className={`flex-1 p-4 rounded-xl border transition-all cursor-pointer ${
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
                </div>
                <button onClick={() => deleteMessage(msg._id)}>
                  <Trash2Icon color="red" size={25} />
                </button>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </div>
  );
}
