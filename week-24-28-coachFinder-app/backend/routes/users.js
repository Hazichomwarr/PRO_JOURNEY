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
        { projection: { password: 0, dateBirth: 0 } }
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

    //if pwd provided
    if (password && password === confirmPassword) {
      values.password = await bcrypt.hash(password, 12);
    }

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

//Upgrade role from user to coach
router.patch("/me/role", authWithToken(), async (req, res) => {
  const db = req.app.locals.db;
  const userId = new ObjectId(req.user.id);

  await db
    .collection("users")
    .updateOne({ _id: userId }, { $set: { role: req.body.role } });

  res.json({ success: true, newRole: req.body.role });
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
