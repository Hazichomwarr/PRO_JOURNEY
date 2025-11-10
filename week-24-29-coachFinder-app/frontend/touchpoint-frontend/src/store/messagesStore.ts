//store/messagesStore.ts
import { create } from "zustand";
import axiosClient from "../lib/axiosClient";
import { useAuthStore } from "./authStore";

interface Message {
  _id: string;
  senderName: string;
  receiverId: string;
  content: string;
  isRead: boolean;
  createdAt?: string;
}

interface MessageState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  unreadCount: number;
  fetchUnreadCount: () => Promise<void>;
  fetchMessages: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
}

export const useMessagesStore = create<MessageState>((set, get) => ({
  messages: [],
  isLoading: false,
  error: null,
  unreadCount: 0,

  fetchUnreadCount: async () => {
    const user = useAuthStore.getState().user;
    if (!user?.id) return;

    try {
      if (user.role === "coach") {
        //first get the coach to extract his ID
        const resCoach = await axiosClient.get("/coaches/by-user");
        const coachId = resCoach.data.coachId;

        const res = await axiosClient.get(`/messages/unread-count/${coachId}`);
        set({ unreadCount: res.data.count });
      } else if (user.role === "seeker") {
        const res = await axiosClient.get(`/messages/unread-count/${user.id}`);
        set({ unreadCount: res.data.count });
      }
    } catch (err) {
      console.error("Failed to fetch unread count", err);
    }
  },

  // ✅ Smart fetch function that handles both roles
  fetchMessages: async () => {
    const user = useAuthStore.getState().user;

    if (!user?.id) return;

    set({ isLoading: true, error: null });

    try {
      if (user.role === "coach") {
        const resCoach = await axiosClient.get("/coaches/by-user");
        const coachId = resCoach.data.coachId;

        const res = await axiosClient.get(`/messages/${coachId}`);
        set({ messages: res.data, isLoading: false });
      } else if (user.role === "seeker") {
        const res = await axiosClient.get(`/messages/${user.id}`);
        set({ messages: res.data, isLoading: false });
      }
    } catch (err) {
      set({ error: "Failed to fetch messages", isLoading: false });
    }
  },
  // ✅ Optimistic update + rollback on failure
  markAsRead: async (id) => {
    const prevMessages = get().messages;

    // Optimistically mark as read locally
    set({
      messages: prevMessages.map((m) =>
        m._id === id ? { ...m, isRead: true } : m
      ),
      unreadCount: Math.max(get().unreadCount - 1, 0), // 🔥 live update badge
    });

    try {
      await axiosClient.patch(`/messages/${id}/read`);
    } catch (err) {
      console.error("Error marking message as 'read':", err);

      // Rollback on failure
      set({ messages: prevMessages });
    }
  },
}));
