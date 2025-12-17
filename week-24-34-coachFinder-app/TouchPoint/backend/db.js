const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log("✅Connected to mongoDB");
    return client.db(process.env.DB_NAME || "touchpoint");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    throw err;
  }
}

module.exports = connectDB;
