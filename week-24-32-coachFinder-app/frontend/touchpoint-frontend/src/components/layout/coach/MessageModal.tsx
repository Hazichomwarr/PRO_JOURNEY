//components/layout/coach/MessageModal.tsx
import { useState } from "react";
import axiosClient from "../../../lib/axiosClient";

interface Props {
  coachId: string;
  coachName: string;
  userId?: string;
  userName?: string;
  onClose: () => void;
}
export default function MessageModal({
  coachId,
  coachName,
  userId,
  userName,
  onClose,
}: Props) {
  const [message, setMessage] = useState("");
  const [isloading, setisLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return alert("Empty message. Please write something!");

    try {
      await axiosClient.post("/messages", {
        coachId,
        userId,
        userName,
        message,
      });
      setMessage("");
      setSent(true);
    } catch (err) {
      alert("Failed to send message");
    } finally {
      setisLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
      >
        X
      </button>
      {sent ? (
        <p className="text-green-600 text-center font-medium">
          Message sent successfully!
        </p>
      ) : (
        <>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Message this coach
          </h2>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Write your message to ${coachName}...`}
            className="w-full border rounded-lg p-3 text-sm focus:ring focus:ring-blue-200"
            rows={4}
          ></textarea>

          {message.length > 0 && (
            <button
              className="w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700"
              onClick={handleSend}
            >
              {isloading ? "Sending..." : "Send Message"}
            </button>
          )}
        </>
      )}
    </>
  );
}
