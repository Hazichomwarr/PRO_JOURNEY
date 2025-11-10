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
      isRead: false,
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

//GET messages by (coach or user) ID
router.get("/:id", authWithToken(), async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid coach id format" });
  }

  try {
    let messages;
    if (req.user.role === "coach") {
      console.log("3. inside try block to fetch messages from DB for a coach");

      messages = await db
        .collection("messages")
        .find({ receiverId: new ObjectId(id) }) //coach
        .sort({ createdAt: -1 }) // latest messages first
        .toArray();

      if (!messages) return res.status(404).json({ error: "No message" });

      res.status(200).json(messages);
    } else if (req.user.role === "seeker") {
      messages = await db
        .collection("messages")
        .find({ senderId: new ObjectId(id) }) //seeker
        .toArray();

      if (!messages) return res.status(404).json({ error: "No message" });
      console.log("4. found messages from DB ->", messages);
    }

    //return messages Doc
    res.status(200).json(messages);
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
      .findOne({ _id: new ObjectId(id) });

    res.status(200).json(updatedMsg);
  } catch (err) {
    console.error("Error patching message:", err);
    res.status(500).json({ message: "Server error while updating message" });
  }
});

// GET /messages/unread-count/:id
router.get("/unread-count/:id", authWithToken(), async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id format" });
  }

  try {
    const messagesCollection = db.collection("messages");

    let filter = {};
    if (req.user.role === "coach") {
      filter = { receiverId: new ObjectId(id), isRead: false };
    } else if (req.user.role === "seeker") {
      filter = { senderId: new ObjectId(id), isRead: false };
    }

    const count = await messagesCollection.countDocuments(filter);
    console.log("unread count ->", count);

    res.json({ count });
  } catch (err) {
    console.error("Error fetching unread count:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
