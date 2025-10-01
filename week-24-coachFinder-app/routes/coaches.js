// const coachSchemaExample = {
//   _id: ObjectId("..."),
//   userId: ObjectId("..."), // reference to users._id
//   bio: "I’ve been mentoring junior devs for 5 years...",
//   expertise: ["JavaScript", "Career Coaching"],
//   hourlyRate: 50,
//   availability: {
//     monday: ["09:00-12:00", "14:00-18:00"],
//     tuesday: [],
//     // ...
//   },
//   rating: 4.8,
//   reviews: [{ userId: ObjectId("..."), comment: "Great mentor!", stars: 5 }],
//   createdAt: ISODate(),
//   updatedAt: ISODate(),
// };

//coaches.js
const express = require("express");
const { ObjectId } = require("mongodb");
const authWithToken = require("../middleware/authWithToken");

const router = express.Router();

//ALL COACHES
router.get("/", authWithToken, async (req, res) => {
  const db = req.app.locals.db;
  try {
    const allCoaches = await db
      .collection("coaches")
      .aggregate([
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
            _id: 1,
            expertise: 1,
            rating: 1,
            "user.firstName": 1,
            "user.lastName": 1,
          },
        },
      ])
      .toArray();
    res.status(200).json(allCoaches);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

//GET A coach BY ID
router.get("/:id", authWithToken, async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;
  try {
    const coach = await db
      .collection("coaches")
      .aggregate([
        {
          $match: { _id: new ObjectId(id) },
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
            "user.firstName": 1,
            "user.lastName": 1,
            bio: 1,
            expertise: 1,
            availability: 1,
            rating: 1,
            reviews: 1,
            hourlyRate: 1,
          },
        },
      ])
      .next(); //returns a single doc (row)

    if (!coach) return res.status(404).json({ error: "Coach not found" });
    res.status(200).json(coach);
  } catch (err) {
    res.status(400).json({ message: "Invalid id" }); //bad request
  }
});

//CREATE A COACH
router.post("/", authWithToken, async (req, res) => {
  const db = req.app.locals.db;

  try {
    //Ensure user is a coach
    if (req.user.role !== "coach")
      return res
        .status(403)
        .json({ error: "Forbidden: only coaches can create a profile" });

    //Find user info
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(req.user.id) });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Ensure they don’t already have a coach profile
    const existingCoach = await db
      .collection("coaches")
      .findOne({ userId: user._id });
    if (existingCoach) {
      return res.status(409).json({ error: "Coach profile already exists" }); // 409 Conflict
    }

    //Extract allowed coach fields from request body
    const { bio, expertise, hourlyRate, availability } = req.body;

    //Build a coach doc
    const coachDoc = {
      userId: new ObjectId(req.user.id),
      bio: bio || "",
      expertise: expertise || [],
      hourlyRate: hourlyRate || 0,
      availability: availability || {},
      rating: 0,
      reviews: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    //Insert into DB
    const newCoach = await db.collection("coaches").insertOne(coachDoc);
    res.status(201).json({
      id: newCoach.insertedId.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      expertise: coachDoc.expertise,
      rating: coachDoc.rating,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE A COACH INFO BY ID
router.put("/:id", authWithToken, async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;

  try {
    // Ensure user is a coach
    if (req.user.role !== "coach") {
      return res
        .status(403)
        .json({ error: "Forbidden: only coaches can update their profile" });
    }

    // Find coach
    const coach = await db
      .collection("coaches")
      .findOne({ _id: new ObjectId(id) });
    if (!coach) return res.status(404).json({ error: "Coach not found" });

    // Ensure ownership: logged-in user must match coach.userId
    if (coach.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "You can only update your own profile" });
    }

    // Build update doc (only allow certain fields to be updated)
    const updates = {};
    if (req.body.bio !== undefined) updates.bio = req.body.bio;
    if (req.body.expertise !== undefined)
      updates.expertise = req.body.expertise;
    if (req.body.hourlyRate !== undefined)
      updates.hourlyRate = req.body.hourlyRate;
    if (req.body.availability !== undefined)
      updates.availability = req.body.availability;

    updates.updatedAt = new Date();

    // Update in DB
    const result = await db
      .collection("coaches")
      .updateOne({ _id: new ObjectId(id) }, { $set: updates });

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Coach not found" });
    }

    // Return updated coach
    const updatedCoach = await db
      .collection("coaches")
      .findOne({ _id: new ObjectId(id) });

    res.status(200).json({
      id: updatedCoach._id.toString(),
      firstName: updatedCoach.firstName,
      lastName: updatedCoach.lastName,
      email: updatedCoach.email,
      bio: updatedCoach.bio,
      expertise: updatedCoach.expertise,
      hourlyRate: updatedCoach.hourlyRate,
      availability: updatedCoach.availability,
      rating: updatedCoach.rating,
      reviews: updatedCoach.reviews,
      updatedAt: updatedCoach.updatedAt,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Invalid ID" });
  }
});

//FILTER COACHES by expertise and/or minimum rating
router.get("/search", async (req, res) => {
  const db = req.app.locals.db;
  const { expertise, minRating } = req.query;

  // Build query dynamically
  const query = {};

  if (expertise) {
    query.expertise = {
      $in: Array.isArray(expertise) ? expertise : [expertise],
    }; // e.g., "JavaScript"
  }

  if (minRating) {
    query.rating = { $gte: parseFloat(minRating) };
  }

  try {
    const coaches = await db
      .collection("coaches")
      .find(query, {
        projection: {
          bio: 1,
          expertise: 1,
          availability: 1,
          rating: 1,
          reviews: 1,
          hourlyRate: 1,
        },
      })
      .toArray();

    if (coaches.length === 0) {
      return res.status(404).json({ error: "No matching coaches" });
    }

    res.status(200).json(coaches);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// DELETE A COACH BY ID (soft delete)
router.delete("/:id", authWithToken, async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;

  try {
    const coach = await db
      .collection("coaches")
      .findOne({ _id: new ObjectId(id) });
    if (!coach) return res.status(404).json({ error: "Coach not found" });

    // Only owner or admin can delete
    if (coach.userId.toString() !== req.user.id && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ error: "Not allowed to delete this profile" });
    }

    const result = await db
      .collection("coaches")
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { deleted: true, deletedAt: new Date() } }
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Coach not found" });
    }

    res.status(200).json({ message: "Coach soft-deleted" });
  } catch (err) {
    res.status(400).json({ message: "Invalid id" }); //bad request
  }
});

module.exports = router;
