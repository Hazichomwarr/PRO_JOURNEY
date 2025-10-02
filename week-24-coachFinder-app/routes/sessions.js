const sessionSchema = {
  _id: ObjectId,
  coachId: ObjectId,
  userId: ObjectId,
  scheduledAt: ISODate,
  duration: Number, // in minutes
  status: "pending" | "confirmed" | "completed" | "cancelled",
  price: Number,
  notes: String,
  createdAt: ISODate,
  updatedAt: ISODate,
};

const reviewSchema = {
  _id: ObjectId,
  coachId: ObjectId,
  userId: ObjectId,
  sessionId: ObjectId, // optional but good to tie to a session
  rating: Number, // 1-5
  comment: String,
  createdAt: ISODate,
  status: "new" | "edited",
};

//routes/sessions.js
const express = require("express");
const { ObjectId } = require("mongodb");
const authWithToken = require("../middleware/authWithToken");

const router = express.Router();

//Create a session(user books one with a coach)
router.post("/", authWithToken, async (req, res) => {
  const db = req.app.locals.db;

  try {
    //only user and admin can book a session
    if (req.user.role !== "user" && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ error: "Forbidden: only users can book a session" });
    }
    //Extract allowed session fields from request body
    const {
      coachId,
      scheduledAt,
      duration,
      price,
      notes,
      status = "pending",
    } = req.body;

    // Validate coachId before DB query
    if (!ObjectId.isValid(coachId)) {
      return res.status(400).json({ error: "Invalid coachId" });
    }

    //Find user info
    const user = await db
      .collection("users")
      .findOne(
        { _id: new ObjectId(req.user.id) },
        { projection: { firstName: 1, lastName: 1, email: 1 } }
      );
    if (!user) return res.status(404).json({ error: "User not found" });

    //Find coach info
    const coach = await db
      .collection("coaches")
      .aggregate([
        { $match: { _id: new ObjectId(coachId) } },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" },
        {
          $project: {
            expertise: 1,
            rating: 1,
            "user.firstName": 1,
            "user.lastName": 1,
            "user.email": 1,
          },
        },
      ])
      .next();

    if (!coach) return res.status(404).json({ error: "Coach not found" });

    //Build a session doc
    const sessionDoc = {
      userId: new ObjectId(req.user.id),
      coachId: new ObjectId(coachId),
      scheduledAt,
      duration,
      price,
      notes: notes || "", // anticipate empty notes
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    //Insert sesion into DB
    const newSession = await db.collection("sessions").insertOne(sessionDoc);
    res.status(201).json({
      id: newSession.insertedId.toString(),
      coachDetails: coach,
      userDetails: user,
      status: sessionDoc.status,
      scheduledAt: sessionDoc.scheduledAt,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

//All sessions for the logged-in user/coach
router.get("/", authWithToken, async (req, res) => {
  const db = req.app.locals.db;

  try {
    //Build aggregation stages dynamically
    let matchStage, lookupStage, unwindStage, projectStage;

    if (req.user.role === "user") {
      matchStage = {
        userId: new ObjectId(req.user.id),
      };
      lookupStage = {
        from: "coaches",
        localField: "coachId",
        foreignField: "_id",
        as: "coach",
      };
      {
        unwindStage = { $unwind: "$coach" };
      }
      projectStage = {
        scheduledAt: 1,
        duration: 1,
        price: 1,
        status: 1,
        notes: 1,
        "coach.expertise": 1,
        "coach.rating": 1,
      };
    } else if (req.user.role === "coach") {
      //Query coach to get its ID
      const coachProfile = await db
        .collection("coaches")
        .findOne({ userId: new ObjectId(req.user.id) });
      if (!coachProfile)
        return res.status(404).json({ error: "Coach profile not found" });

      matchStage = { coachId: coachProfile._id };

      lookupStage = {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      };
      {
        unwindStage = { $unwind: "$user" };
      }
      projectStage = {
        scheduledAt: 1,
        duration: 1,
        price: 1,
        status: 1,
        notes: 1,
        "user.firstName": 1,
        "user.lastName": 1,
        "user.email": 1,
      };
    } else {
      return res.status(403).json({ error: "Invalid role" });
    }

    //Get all sessions for user OR coach from DB
    const sessions = await db
      .collection("sessions")
      .aggregate([
        { $match: { ...matchStage, status: { $ne: "cancelled" } } },
        { $lookup: lookupStage },
        unwindStage,
        { $project: projectStage },
      ])
      .toArray();

    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

//Update session (confirm/cancel/reschedule)
router.put("/:id", authWithToken, async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;

  try {
    let result, lookupStage, unwindStage, projectStage;

    if (req.user.role === "coach") {
      // Validation for coach
      const allowedStatuses = ["confirmed", "cancelled", "rescheduled"];
      if (!allowedStatuses.includes(req.body.status)) {
        return res.status(400).json({ error: "Invalid status value" });
      }
      if (Object.keys(req.body).some((k) => k !== "status")) {
        return res.status(400).json({ error: "Invalid status value" });
      }

      if (req.body.status === "cancelled") {
        result = await db.collection("sessions").updateOne(
          { _id: new ObjectId(id) },
          {
            $set: {
              status: req.body.status,
              cancelledAt: new Date(),
              cancelledBy: "coach",
            },
          }
        );
      } else {
        result = await db
          .collection("sessions")
          .updateOne(
            { _id: new ObjectId(id) },
            { $set: { status: req.body.status } }
          );
      }

      lookupStage = {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      };
      {
        unwindStage = { $unwind: "$user" };
      }
      projectStage = {
        scheduledAt: 1,
        duration: 1,
        price: 1,
        status: 1,
        notes: 1,
        "user.firstName": 1,
        "user.lastName": 1,
        "user.email": 1,
      };
    } else if (req.user.role === "user") {
      //validation for user
      const allowedFields = ["scheduleAt", "status", "notes"];
      if (Object.keys(req.body).some((k) => !allowedFields.includes(k))) {
        return res.status(400).json({
          error: "Only scheduledAT, status and notes can be updated by user",
        });
      }
      const newDate = new Date(req.body.scheduledAt);
      if (isNaN(newDate.getTime())) {
        return res.status(400).json({ error: "Invalid scheduledAT date" });
      }
      //Can't set date to past date
      if (newDate < new Date()) {
        return res
          .status(400)
          .json({ error: "schedule time can't be in the past" });
      }

      if (req.body.status === "cancelled") {
        result = await db.collection("sessions").updateOne(
          { _id: new ObjectId(id) },
          {
            $set: {
              scheduledAt: newDate,
              notes: req.body.notes || "", //always use default with string inputs
              status: req.body.status,
              cancelledAt: new Date(),
              cancelledBy: "user",
            },
          }
        );
      } else {
        result = await db.collection("sessions").updateOne(
          { _id: new ObjectId(id) },
          {
            $set: {
              scheduledAt: newDate,
              notes: req.body.notes,
              status: req.body.status,
            },
          }
        );
      }

      lookupStage = {
        from: "coaches",
        localField: "coachId",
        foreignField: "_id",
        as: "coach",
      };
      {
        unwindStage = { $unwind: "$coach" };
      }
      projectStage = {
        scheduledAt: 1,
        duration: 1,
        price: 1,
        status: 1,
        notes: 1,
        "coach.expertise": 1,
        "coach.rating": 1,
      };
    } else {
      return res.status(403).json({ error: "Invalid role" });
    }
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Session not found" });
    }

    //Return updated session
    const updatedSession = await db
      .collection("sessions")
      .aggregate([
        { $match: { _id: new ObjectId(id) } },
        { $lookup: lookupStage },
        unwindStage,
        { $project: projectStage },
      ])
      .next();
    res.status(200).json(updatedSession);
  } catch (err) {
    res.status(400).json({ message: "Invalid id", error: err.message });
  }
});
