const express = require("express");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");

const router = express.Router();

//REGISTER
router.post("/", async (req, res) => {
  const db = req.app.locals.db;

  //1.get the payload from the post
  const { username, password, posts = [] } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "username & password required" });

  //2.check duplicate first
  const existing = await db.collection("users").findOne({ username });
  if (existing) return res.status(409).json({ message: "Name already exists" }); //409:conflict

  //3.Add user to db with hashed pwd
  const hashed = await bcrypt.hash(password, 12);
  const newUser = await db
    .collection("users")
    .insertOne({ username, password: hashed, posts });
  res.status(201).json({ id: newUser.insertedId.toString(), username });
});

//LIST USERS (username and ID only)
router.get("/", async (req, res) => {
  const db = req.app.locals.db;

  const allUsers = await db
    .collection("users")
    .find({}, { projection: { username: 1 } })
    .toArray();

  const names = allUsers.map((u) => ({
    id: u._id.toString(),
    name: u.username,
  }));
  res.json(names);
});

//GET USER BY ID (and their posts)
router.get("/:id", async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;

  try {
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(id) }, { projection: { password: 0 } });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({
      id: user._id.toString(),
      username: user.username,
      posts: user.posts || [],
    });
  } catch (err) {
    res.status(400).json({ message: "Invalid id" }); //bad request
  }
});

module.exports = router;
