import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Task } from "../models/task";

interface Store {
  // nouns(state)
  tasks: Task[];

  //verbs (actions that change state)
  addTask: (task: Task) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
  clearTasks: () => void;
}

export const useTaskStore = create<Store>()(
  persist(
    (set) => ({
      //Nouns
      tasks: [],

      //verbs
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, isDone: !t.isDone } : t
          ),
        })),
      removeTask: (id) =>
        set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),

      clearTasks: () => set({ tasks: [] }),
    }),

    { name: "task-storage" }
  )
);
