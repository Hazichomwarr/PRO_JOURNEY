import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Task } from "../models/task";

export function useTasks() {
  const queryClient = useQueryClient();

  const tasksQuery = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await fetch("/tasks");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const addTask = useMutation({
    mutationFn: async (task: Omit<Task, "id">) => {
      const res = await fetch("/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const deleteTask = useMutation({
    mutationFn: async (id: string) =>
      fetch(`/tasks/${id}`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  return { tasksQuery, addTask, deleteTask };
}
