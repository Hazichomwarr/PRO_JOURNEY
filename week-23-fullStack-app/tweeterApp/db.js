const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function connecDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");
    return client.db(process.env.DB_NAME || "tweeter");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    throw err;
  }
}
module.exports = connecDB;
