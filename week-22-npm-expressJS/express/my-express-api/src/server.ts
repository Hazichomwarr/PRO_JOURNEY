//src/server.ts
import express from "express";
import tasksRouter from "./routes/tasks.routes";
import cors from "cors";

const app = express();
const PORT = 3000;

//Enable CORS for all requests
app.use(cors());

//Middleware
app.use(express.json());

///Routes
app.use("/tasks", tasksRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
