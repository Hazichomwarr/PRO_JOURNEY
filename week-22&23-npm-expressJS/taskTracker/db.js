const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");
    return client.db("taskTracker");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  }
}
module.exports = connectDB;
