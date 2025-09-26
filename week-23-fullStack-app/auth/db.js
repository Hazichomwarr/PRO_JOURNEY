const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function connecDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");
    return client.db("tweeter");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  }
}
module.exports = connecDB;
