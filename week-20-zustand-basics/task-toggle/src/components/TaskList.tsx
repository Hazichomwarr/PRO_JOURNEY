import { useTaskStore } from "../stores/taskStore";
import type { Task } from "../models/task";
import { useNavigate } from "react-router-dom";

export default function TaskList() {
  const tasks = useTaskStore((s) => s.tasks);
  const toggleTask = useTaskStore((s) => s.toggleTask);
  const removeTask = useTaskStore((s) => s.removeTask);

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center my-4">
      <h3 className="text-2xl font-medium mb-4">All Tasks</h3>

      {/* if No Tasks */}
      {tasks.length === 0 ? (
        <div className=" flex justify-center items-center gap-2 text-gray-400 text-2xl text-center">
          No Tasks yet.{" "}
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

              {/* Toggle && Delete buttons */}
              <div className="flex gap-4">
                <button
                  className="text-sm rounded-md bg-green-500 hover:bg-green-600 active:bg-green-700 text-white px-2 py-1 no-underline"
                  onClick={() => toggleTask(task.id)}
                >
                  {task.isDone ? "unDo" : "Done"}
                </button>
                <button
                  className="text-sm rounded-md bg-red-500 hover:bg-red-600 active:bg-red-700 text-white px-2 py-1 no-underline"
                  onClick={() => removeTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
