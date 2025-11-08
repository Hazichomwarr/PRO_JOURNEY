//messages.js
const express = require("express");
const authWithToken = require("../middleware/authWithToken");
const { ObjectId } = require("mongodb");

const router = express.Router();

//CREATE NEW MESSAGE
router.post("/", authWithToken(), async (req, res) => {
  const db = req.app.locals.db;
  const { coachId, userId, userName, message } = req.body;

  try {
    //Build a message doc
    const messageDoc = {
      senderId: new ObjectId(userId),
      senderName: userName,
      receiverId: new ObjectId(coachId),
      content: message,
      isread: false,
      createdAt: new Date(),
    };

    //Insert into DB
    const newMessage = await db.collection("messages").insertOne(messageDoc);

    res.status(201).json({
      id: newMessage.insertedId.toString(),
      senderName: userName,
      receiverId: coachId,
      content: message,
      isRead: false,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

//GET messages by coachID
router.get("/:id", authWithToken(), async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid coach id format" });
  }

  try {
    const messages = await db
      .collection("messages")
      .find({ coachId: new ObjectId(id) });
    if (!messages) return res.status(404).json({ error: "No message" });
    res.status(200).json(coach);
  } catch (err) {
    console.error("Error fetching coach:", err);
    res.status(500).json({ message: "Server error while fetching coach" });
  }
});

//Update message to "read" endpoint
router.patch("/:id/read", authWithToken(), async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid message id format" });
  }

  try {
    const result = await db
      .collection("messages")
      .updateOne({ _id: new ObjectId(id) }, { $set: { isRead: true } });

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Message not found" });
    }

    //return updated message
    const updatedMsg = await db
      .collection("messages")
      .find({ _id: new ObjectId(id) });
    res.status(200).json(updatedMsg);
  } catch (err) {
    console.error("Error patching message:", err);
    res.status(500).json({ message: "Server error while updating message" });
  }
});

module.exports = router;
