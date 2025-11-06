//routes/coaches.js
const express = require("express");
const { ObjectId } = require("mongodb");
const authWithToken = require("../middleware/authWithToken");

const router = express.Router();

//ALL COACHES (with averageRating + totalReviews)
router.get("/", authWithToken(), async (req, res) => {
  const db = req.app.locals.db;
  try {
    const count = await db.collection("coaches").countDocuments();
    console.log("total coaches in db ->", count);

    const allCoaches = await db
      .collection("coaches")
      .aggregate([
        //convert userId to ObjectId first
        {
          $addFields: {
            userId: { $toObjectId: "$userId" },
          },
        },
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
          $lookup: {
            from: "reviews",
            localField: "_id",
            foreignField: "coachId",
            as: "reviews",
          },
        },
        //Add computed fields
        {
          $addFields: {
            totalReviews: { $size: "$reviews" },
            averageRating: {
              $cond: [
                { $gt: [{ $size: "$reviews" }, 0] },
                { $avg: "$reviews.rating" },
                null, // no reviews yet
              ],
            },
          },
        },
        {
          $project: {
            _id: 1,
            expertise: 1,
            "user.firstName": 1,
            "user.lastName": 1,
            totalReviews: 1,
            averageRating: 1,
          },
        },
      ])
      .toArray();
    console.log("all-coaches ->", allCoaches);
    res.status(200).json(allCoaches);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// GET A COACH BY ID with Reviews + averageRating + totalReviews
router.get("/:id", authWithToken(), async (req, res) => {
  console.log("inside /coaches/:id");
  const db = req.app.locals.db;
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid coach id format" });
  }

  try {
    const coach = await db
      .collection("coaches")
      .aggregate([
        { $match: { _id: new ObjectId(id) } },
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
          $lookup: {
            from: "reviews",
            localField: "_id",
            foreignField: "coachId",
            as: "reviews",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "reviews.userId",
            foreignField: "_id",
            as: "reviewers",
          },
        },
        {
          $addFields: {
            totalReviews: { $size: "$reviews" },
            averageRating: {
              $cond: [
                { $gt: [{ $size: "$reviews" }, 0] },
                { $avg: "$reviews.rating" },
                null,
              ],
            },
            reviews: {
              $map: {
                input: "$reviews",
                as: "rev",
                in: {
                  rating: "$$rev.rating",
                  status: "$$rev.status",
                  createdAt: "$$rev.createdAt",
                  updatedAt: "$$rev.updatedAt",
                  comment: "$$rev.comment",
                  userInfo: {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: "$reviewers",
                          as: "u",
                          cond: { $eq: ["$$u._id", "$$rev.userId"] },
                        },
                      },
                      0,
                    ],
                  },
                },
              },
            },
          },
        },
        {
          $project: {
            "user.firstName": 1,
            "user.lastName": 1,
            "user.image": 1,
            bio: 1,
            expertise: 1,
            availability: 1,
            hourlyRate: 1,
            reviews: 1,
            totalReviews: 1,
            averageRating: 1,
          },
        },
      ])
      .next();

    if (!coach) return res.status(404).json({ error: "Coach not found" });
    res.status(200).json(coach);
  } catch (err) {
    console.error("Error fetching coach:", err);
    res.status(500).json({ message: "Server error while fetching coach" });
  }
});

//CREATE A COACH
router.post("/", authWithToken(), async (req, res) => {
  const db = req.app.locals.db;

  try {
    //Ensure user is a coach
    if (req.user.role !== "coach") {
      console.log("user role is ->", req.user.role);
      return res
        .status(403)
        .json({ error: "Forbidden: only coaches can create a profile" });
    }

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
      availability: availability || [],
      createdAt: new Date(),
      updatedAt: new Date(),
      totalReviews: 0,
      averageRating: null,
    };

    //Insert into DB
    const newCoach = await db.collection("coaches").insertOne(coachDoc);

    res.status(201).json({
      id: newCoach.insertedId.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      expertise: coachDoc.expertise,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE A COACH INFO BY ID
router.put("/:id", authWithToken(), async (req, res) => {
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
    updates.totalReviews = coach.totalReviews;
    updates.averageRating = coach.averageRating;

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

    return res.status(200).json({
      id: updatedCoach._id.toString(),
      bio: updatedCoach.bio,
      expertise: updatedCoach.expertise,
      hourlyRate: updatedCoach.hourlyRate,
      availability: updatedCoach.availability,
      updatedAt: updatedCoach.updatedAt,
      totalReviews: updatedCoach.totalReviews,
      averageRating: updatedCoach.averageRating,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Invalid ID" });
  }
});

//FILTER COACHES by expertise and/or minimum rating
router.get("/search", async (req, res) => {
  const db = req.app.locals.db;
  const { expertise } = req.query;

  // Build query dynamically
  const query = {};

  if (expertise) {
    query.expertise = {
      $in: Array.isArray(expertise) ? expertise : [expertise],
    }; // e.g., "JavaScript"
  }

  try {
    const coaches = await db
      .collection("coaches")
      .find(query, {
        projection: {
          _id: 1,
          bio: 1,
          expertise: 1,
          availability: 1,
          hourlyRate: 1,
          totalReviews: 1,
          averageRating: 1,
        },
      })
      .toArray();

    if (coaches.length === 0) {
      return res.status(404).json({ error: "No matching coaches" });
    }

    res.status(200).json(coaches);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

// DELETE A COACH BY ID (soft delete)
router.delete("/:id", authWithToken("coach"), async (req, res) => {
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
