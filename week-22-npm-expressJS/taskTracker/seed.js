const { MongoClient, ObjectId } = require("mongodb");

const client = new MongoClient("mongodb://127.0.0.1:27017");
const dbName = "tweeter";

async function seed() {
  await client.connect();
  const db = client.db(dbName);

  // Drop collections if they exist
  await db
    .collection("users")
    .drop()
    .catch(() => {});
  await db
    .collection("posts")
    .drop()
    .catch(() => {});

  console.log("Dropped old collections");

  // Insert users
  const users = [
    { _id: new ObjectId(), name: "Hamza" },
    { _id: new ObjectId(), name: "Amina" },
  ];

  await db.collection("users").insertMany(users);

  // Insert tasks with userId references
  const tasks = [
    {
      title: "Finish React project",
      dueDate: new Date("2025-09-30"),
      userId: users[0]._id,
    },
    {
      title: "Prepare dinner",
      dueDate: new Date("2025-09-25"),
      userId: users[1]._id,
    },
    {
      title: "Buy groceries",
      dueDate: new Date("2025-09-24"),
      userId: users[0]._id,
    },
  ];

  await db.collection("tasks").insertMany(tasks);

  console.log("Database seeded ✅");

  await client.close();
}

seed();
