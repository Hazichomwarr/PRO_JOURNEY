const express = require("express");
const connectDB = require("./db");
const { ObjectId } = require("mongodb");

const app = express();
app.use(express.json());

let db;

(async () => {
  db = await connectDB();
})();

// ---------------- TASKS ----------------
//Get Tasks
app.get("/tasks", async (req, res) => {
  const tasks = await db.collection("tasks").find().toArray();
  res.json(tasks);
});

//Post new Task
app.post("/tasks", async (req, res) => {
  const task = req.body;
  const result = await db.collection("tasks").insertOne(task);
  res.json(result);
});

//Update (PUT)
app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const taskUpdated = req.body;
  const result = await db
    .collection("tasks")
    .updateOne({ _id: new isObjectId(id) }, { $set: taskUpdated });
  res.json(result);
});

//Delete
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;

  //check if valid ObjectId
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }
  const result = await db
    .collection("tasks")
    .deleteOne({ _id: new ObjectId(id) });

  if (result.deletedCount === 0) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.json(result);
});

// ---------------- USERS ----------------

//POST
app.post("/users", async (req, res) => {
  const user = req.body;
  const newUser = await db.collection("users").insertOne(user);
  res.json(newUser);
});

//GET all users
app.get("/users", async (req, res) => {
  const users = await db.collection("users").find().toArray();
  res.json(users);
});

//GET users with their tasks(JOIN style)
app.get("/users-with-tasks", async (req, res) => {
  const data = await db
    .collection("users")
    .aggregate([
      {
        $lookup: {
          from: "tasks",
          localField: "_id",
          foreignField: "userId",
          as: "tasks",
        },
      },
    ])
    .toArray();

  res.json(data);
});

app.listen(3000, () => console.log("🚀 Server running on port 3000"));
