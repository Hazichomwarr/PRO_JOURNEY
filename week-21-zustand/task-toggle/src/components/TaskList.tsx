import { useTasks } from "../hooks/useTasks";
import type { Task } from "../models/task";
import { useNavigate } from "react-router-dom";

export default function TaskList() {
  const navigate = useNavigate();
  const { tasksQuery, deleteTask } = useTasks();

  if (tasksQuery.isLoading)
    return (
      <p className="flex justify-center items-center gap-2 text-gray-400 text-2xl text-center">
        Loading tasks...
      </p>
    );

  if (tasksQuery.isError)
    return (
      <p className="flex justify-center items-center gap-2 text-black text-2xl text-center">
        Error loading tasks
      </p>
    );

  const tasks = tasksQuery.data ?? [];

  return (
    <div className="w-[90%] flex flex-col items-center justify-center my-4">
      <h3 className="text-2xl font-medium mb-4">All Tasks</h3>

      {/* If No Tasks */}
      {tasks.length === 0 ? (
        <div className="flex justify-center items-center gap-2 text-gray-400 text-2xl text-center">
          No Tasks yet.
          <button
            className="text-sm rounded-md bg-green-500 hover:bg-green-600 active:bg-green-700 text-white px-2 py-1"
            onClick={() => navigate("/tasks/new")}
          >
            Add Task
          </button>
        </div>
      ) : (
        <ul className="flex flex-col items-center gap-2 shadow-md w-[50%] rounded-md">
          {tasks.map((task: Task) => (
            <li
              key={task.id}
              className="flex justify-between mb-4 border rounded-lg shadow-md p-4 w-[90%] bg-stone-50"
            >
              <span className={`${task.isDone ? "line-through" : ""}`}>
                {task.text}
              </span>

              <div className="flex gap-4">
                <button
                  type="button"
                  className="text-xs rounded-md bg-gray-300 px-2 py-1 no-underline"
                  onClick={() => deleteTask.mutate(task.id)}
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {tasks.length !== 0 && (
        <div className="flex gap-8">
          <button
            type="button"
            className="py-2 px-3 mt-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 active:scale-[0.98] transition"
            onClick={() => navigate("/tasks/new")}
          >
            Add New Task
          </button>
        </div>
      )}
    </div>
  );
}
