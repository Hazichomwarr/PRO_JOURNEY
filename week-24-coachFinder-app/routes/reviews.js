const reviewSchema = {
  _id: ObjectId,
  coachId: ObjectId,
  userId: ObjectId,
  sessionId: ObjectId, // optional but good to tie to a session
  rating: Number, // 1-5
  comment: String,
  createdAt: ISODate,
  updatedAt: ISODate,
  status: "new" | "edited" | "deleted",
};

//routes/reviews.js
const express = require("express");
const { ObjectId } = require("mongodb");
const authWithToken = require("../middleware/authWithToken");

const router = express.Router();

//Create a review
router.post("/", authWithToken, async (req, res) => {
  const db = req.app.locals.db;

  try {
    //only user can leave a review
    if (req.user.role !== "user") {
      return res
        .status(403)
        .json({ error: "Forbidden: only a user can leave a review" });
    }

    const { sessionId, rating, comment } = req.body;

    //Validate rating
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    //Check session existence & ownership
    const sessionToReview = await db.collection("sessions").findOne({
      _id: new ObjectId(sessionId),
      userId: new ObjectId(req.user.id),
    });
    if (!sessionToReview)
      return res.status(404).json({ error: "Session not found" });

    //if session not completed, can't leave a review
    if (sessionToReview.status !== "completed") {
      return res
        .status(409)
        .json({ error: "You can only review completed sessions" });
    }

    //prevent duplicate reviews
    const existingReview = await db.collection("reviews").findOne({
      sessionId: new ObjectId(sessionId),
      userId: new ObjectId(req.user.id),
    });
    if (existingReview) {
      return res
        .status(409)
        .json({ error: "You already reviewed this session" });
    }

    //Build review doc
    const reviewDoc = {
      coachId: new ObjectId(sessionToReview.coachId),
      userId: new ObjectId(req.user.id),
      sessionId: new ObjectId(sessionId),
      rating,
      comment: comment || "",
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "new",
    };

    //Insert review into DB
    const newReview = await db.collection("reviews").insertOne(reviewDoc);
    res.status(201).json({
      id: newReview.insertedId.toString(),
      coachId: reviewDoc.coachId,
      rating: reviewDoc.rating,
      comment: reviewDoc.comment,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

//All reviews for a coach (with user info)
router.get("/coach/:id", authWithToken, async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;

  try {
    const coachReviews = await db
      .collection("reviews")
      .aggregate([
        //1.get all reviews matching coachId
        { $match: { coachId: new ObjectId(id) } },

        //2.Join Users collection as "userInfo"
        {
          $lookup: {
            from: "users",
            loacalField: "userId",
            foreignField: "_id",
            as: "userInfo",
          },
        },
        { $unwind: "$userInfo" },

        //3.Get users infos from each review
        {
          $project: {
            rating: 1,
            comment: 1,
            createdAt: 1,
            status: 1,
            "userInfo._id": 1,
            "userInfo.firstName": 1,
            "userInfo.lastName": 1,
            "userInfo.image": 1,
          },
        },
        { $sort: { createdAt: -1 } }, //latest first
      ])
      .toArray();
    if (coachReviews.length === 0)
      return res.status(404).json({ error: "Reviews not found" });

    res.status(200).json(coachReviews);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Invalid coach ID" });
  }
});

//All logged-in user's reviews
router.get("/me", authWithToken, async (req, res) => {
  const db = req.app.locals.db;
  try {
    const myReviews = await db
      .collection("reviews")
      .aggregate([
        { $match: { userId: new ObjectId(req.user.id) } },
        {
          $lookup: {
            from: "coaches",
            localField: "coachId",
            foreignField: "_id",
            as: "coach",
          },
        },
        { $unwind: "$coach" },
        {
          $lookup: {
            from: "users",
            localFeild: "coach.userId",
            foreignField: "_id",
            as: "coachUserInfo",
          },
        },
        { $unwind: "$coachUserInfo" },
        {
          $project: {
            rating: 1,
            comment: 1,
            createdAt: 1,
            status: 1,
            "coach._id": 1,
            "coach.expertise": 1,
            "coachUserInfo.firstName": 1,
            "coachUserInfo.lastName": 1,
          },
        },
      ])
      .toArray();
    if (myReviews.length === 0)
      return res.status(404).json({ error: "No reviews written yet" });

    res.status(200).json(myReviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

//User edit review
router.put("/:id", authWithToken, async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;

  try {
    const { rating, comment } = req.body;

    //Validation for user
    const allowedFields = ["rating", "comment"];
    if (Object.keys(req.body).some((k) => !allowedFields.includes(k))) {
      return res.status(400).json({
        error: "Only rating and comment can be updated by user",
      });
    }
    //Validate rating
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    //Ensure review belongs to logged-in user
    const review = await db
      .collection("reviews")
      .findOne({ _id: new ObjectId(id) });
    if (!review) return res.status(404).json({ error: "Review not found" });
    if (review.userId.toString() !== req.user.id)
      return res
        .status(403)
        .json({ error: "Not authorized to edit this review" });

    //Build update
    const update = {
      ...(rating !== undefined && { rating }), //explain this js type: ...()
      ...(comment !== undefined && { comment }),
      updatedAt: new Date(),
      status: "edited",
    };

    await db
      .collection("reviews")
      .updateOne({ _id: new ObjectId(id) }, { $set: update });
    res.status(200).json({
      id,
      rating: update.rating ?? review.rating, //explain the double ?? in js
      comment: update.comment ?? review.comment,
      status: update.status,
      updatedAt: update.updatedAt,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Invalid review ID" });
  }
});

//Soft delete review (user or admin only)
router.delete("/:id", authWithToken, async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;

  try {
    //Ensure Existence & Ownership
    const review = await db
      .collection("reviews")
      .findOne({ _id: new ObjectId(id) });
    if (!review) return res.status(404).json({ error: "Review not found" });
    if (review.userId.toString() !== req.user.id)
      return res
        .status(403)
        .json({ error: "You are Not authorized to delete review" });

    //Soft delete
    const result = await db
      .collection("reviews")
      .updateOne(
        { _id: new ObjectId(review._id) },
        { $set: { status: "deleted" } }
      );
    res.status(200).json({ id: review._id.toString(), status: "deleted" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Invalid review ID" });
  }
});

module.exports = router;
