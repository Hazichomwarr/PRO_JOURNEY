//store/messagesStore.ts
import { create } from "zustand";
import axiosClient from "../lib/axiosClient";

interface Message {
  id: string;
  senderName: string;
  receiverId: string;
  content: Message;
  isRead: boolean;
}

interface MessageState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  fetchMessages: (coachId: string) => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
}

export const useMessagesStore = create<MessageState>((set, get) => ({
  messages: [],
  isLoading: false,
  error: null,

  fetchMessages: async (coachId) => {
    set({ isLoading: true, error: null });

    try {
      const res = await axiosClient.get(`/messages/${coachId}`);
      set({ messages: res.data, isLoading: false });
    } catch (err) {
      set({ error: "Failed to fetch messages", isLoading: false });
    }
  },

  markAsRead: async (id) => {
    try {
      await axiosClient.patch(`/messages/${id}/read`);
      set({
        messages: get().messages.map((m: Message) =>
          m.id === id ? { ...m, read: true } : m
        ),
      });
    } catch (err) {
      console.error("Error marking as read", err);
    }
  },
}));
