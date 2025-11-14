//users.js
const express = require("express");
const bcrypt = require("bcrypt");
const authWithToken = require("../middleware/authWithToken");
const { ObjectId } = require("mongodb");

const router = express.Router();

//ALL USERS (first + last + email)
router.get("/", async (req, res) => {
  const db = req.app.locals.db;
  try {
    const allUsers = await db
      .collection("users")
      .find({}, { projection: { firstName: 1, lastName: 1, email: 1, _id: 0 } })
      .toArray();
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

//GET A USER BY ID
router.get("/:id", async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;
  try {
    const user = await db
      .collection("users")
      .findOne(
        { _id: new ObjectId(id) },
        { projection: { password: 0, confirmPassword: 0, dateBirth: 0 } }
      );
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
});

//UPDATE A USER
router.put("/:id", async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;
  const { confirmPassword, password, ...values } = req.body;

  try {
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(id) });
    if (!user) return res.status(404).json({ error: "User not found" });

    // //if pwd provided
    // if (password && password === confirmPassword) {
    //   values.password = await bcrypt.hash(password, 12);
    // }

    //now update user in db
    const result = await db
      .collection("users")
      .updateOne({ _id: new ObjectId(id) }, { $set: values });

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User updated" });
  } catch (err) {
    res.status(400).json({ error: "Invalid User ID" });
  }
});

// --- GET: loggedIn DashBoard ---
router.get("/me", authWithToken(), async (req, res) => {
  console.log("→ Inside /me route");
  const db = req.app.locals.db;

  try {
    const user = await db
      .collection("users")
      .findOne(
        { _id: new ObjectId(req.user.id) },
        { projection: { password: 0, confirmPassword: 0, dateBirth: 0 } }
      );

    if (!user) return res.status(404).json({ message: "User not found" });
    console.log("User found:", user.email);
    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Server error" });
  }
});

//Upgrade role from user to coach
router.patch("/upgrade-role", authWithToken(), async (req, res) => {
  console.log(
    "🔁 /users/me/role called, req.user:",
    req.user,
    "body:",
    req.body
  );

  const db = req.app.locals.db;
  const userId = new ObjectId(req.user.id);
  console.log("userID ->", userId);
  const { role } = req.body;

  console.log("Incoming upgrade body:", req.body);
  console.log("req.user from token:", req.user);
  console.log(
    "🧾 ObjectId check:",
    req.user?.id && ObjectId.isValid(req.user.id)
  );

  const result = await db
    .collection("users")
    .updateOne({ _id: userId }, { $set: { role: role } });
  console.log("user found ->", result);

  if (!result.matchedCount)
    return res.status(404).json({ message: "User not found" });

  const updatedUser = { ...req.user, role };

  res.json({ user: updatedUser });
});

//DELETE A USER
router.delete("/:id", async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;

  try {
    const result = await db
      .collection("users")
      .deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "success" });
  } catch (err) {
    res.status(400).json({ message: "Invalid id" }); //bad request
  }
});

module.exports = router;
