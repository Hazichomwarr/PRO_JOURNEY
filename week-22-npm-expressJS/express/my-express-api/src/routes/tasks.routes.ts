//src/routes/users.routes.ts
import { Router, type Request, type Response } from "express";

const router = Router();

//fake in-memory data
let tasks = [
  { id: "1", text: "Learn React", isDone: false },
  { id: "2", text: "Build API", isDone: false },
];

//Get all tasks
router.get("/", (_req: Request, res: Response) => {
  res.json(tasks);
});

//Get one user by id
router.get("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const task = tasks.find((t) => t.id === id);
  if (task) res.json(task);
  else res.status(404).json({ error: "User not found" });
});

//Add a task
router.post("/", (req: Request, res: Response) => {
  const newTask = { id: Date.now().toString(), ...req.body };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

//Delete a task
router.delete("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  tasks = tasks.filter((t) => t.id !== id);
  res.status(204).send(); //send() because no content
});

export default router;
