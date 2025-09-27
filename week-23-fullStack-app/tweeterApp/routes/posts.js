const express = require("express");
const { ObjectId } = require("mongodb");
const authenticateToken = require("../middleware/authenticateToken");

const router = express.Router();

//Get All Posts (id + posts)
router.get("/", authenticateToken, async (req, res) => {
  const db = req.app.locals.db;

  const allPosts = await db
    .collection("posts")
    .find({}, { projection: { text: 1 } })
    .toArray();
  res.status(200).json(allPosts);
});

//Create post (references userId)
router.post("/", authenticateToken, async (req, res) => {
  const db = req.app.locals.db;

  const userId = req.user.id.toString(); // req.user comes from JWT
  const { text } = req.body;
  if (!text) return res.status(400).json({ message: "text required" });

  //push post into the db
  const post = { text, userId: new ObjectId(userId), createAt: new Date() };
  const result = await db.collection("posts").insertOne(post);

  //Optional: push tu user's posts array too
  await db
    .collection("users")
    .updateOne({ _id: new ObjectId(userId) }, { $push: { posts: post } });
  res.status(201).json({ id: result.insertedId.toString(), text });
});

// Get posts from specific user id
router.get("/user/:id", async (req, res) => {
  const db = req.app.locals.db;
  try {
    const posts = await db
      .collection("posts")
      .find({ userId: new ObjectId(req.params.id) })
      .toArray();
    res.json(
      posts.map((p) => ({
        id: p._id.toString(),
        text: p.text,
        createdAt: p.createdAt,
      }))
    );
  } catch (err) {
    res.status(400).json({ message: "Invalid id" });
  }
});

module.exports = router;
