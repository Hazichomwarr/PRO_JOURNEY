import React, { useState } from "react";
import { useTaskStore } from "../stores/taskStore";
import type { Task } from "../models/task";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function TaskForm() {
  const addTask = useTaskStore((s) => s.addTask);
  const tasks = useTaskStore((s) => s.tasks);

  const navigation = useNavigate();

  const [values, setValues] = useState<Omit<Task, "id">>({
    text: "",
    isDone: false,
  });

  // persist tasks to localstorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, type, value } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (values.text.trim()) {
      addTask({ ...values, id: uuidv4() });
      setValues({ text: "", isDone: false });
      navigation("/tasks");
    }
  }

  return (
    <form
      action=""
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto space-y-6 bg-white p-6 rounded-2xl"
    >
      <div className="flex flex-col gap-4 w-full">
        <input
          value={values.text}
          onChange={handleChange}
          name="text"
          type="text"
          placeholder="Add new Task..."
          className={`w-full rounded-lg p-2 border focus:ring-2 focus:ring-blue-500`}
        />
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 active:scale-[0.98] transition disabled:cursor-not-allowed disabled:bg-gray-400"
          disabled={Boolean(!values.text)}
        >
          Add Task
        </button>
      </div>
    </form>
  );
}
