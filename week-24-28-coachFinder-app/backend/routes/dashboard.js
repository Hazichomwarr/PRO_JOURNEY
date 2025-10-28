// routes/dashboard.js
const express = require("express");
const { ObjectId } = require("mongodb");
const authWithToken = require("../middleware/authWithToken");

const router = express.Router();

// GET /api/dashboard/stats
router.get("/stats", authWithToken, async (req, res) => {
  const db = req.app.locals.db;

  try {
    // Different stats for coach vs user
    if (req.user.role === "coach") {
      // Find the coach profile to get its _id
      const coachProfile = await db
        .collection("coaches")
        .findOne({ userId: new ObjectId(req.user.id) });
      if (!coachProfile)
        return res.status(404).json({ error: "Coach profile not found" });

      const coachId = coachProfile._id;

      // Aggregate session stats
      const sessions = await db
        .collection("sessions")
        .aggregate([
          { $match: { coachId } },
          {
            $group: {
              _id: "$status",
              count: { $sum: 1 },
              totalEarnings: {
                $sum: {
                  $cond: [{ $eq: ["$status", "completed"] }, "$price", 0],
                },
              },
            },
          },
        ])
        .toArray();

      // Aggregate review stats
      const reviews = await db
        .collection("reviews")
        .aggregate([
          { $match: { coachId, status: { $ne: "deleted" } } },
          {
            $group: {
              _id: null,
              avgRating: { $avg: "$rating" },
              totalReviews: { $sum: 1 },
            },
          },
        ])
        .next();

      // Upcoming sessions count
      const upcomingSessions = await db.collection("sessions").countDocuments({
        coachId,
        status: { $in: ["pending", "confirmed"] },
        scheduledAt: { $gte: new Date() },
      });

      // Format session summary (so the frontend can display nicely)
      const sessionStats = sessions.reduce(
        (acc, s) => {
          acc.byStatus[s._id] = s.count;
          acc.totalEarnings += s.totalEarnings;
          acc.totalSessions += s.count;
          return acc;
        },
        { byStatus: {}, totalEarnings: 0, totalSessions: 0 }
      );

      res.status(200).json({
        role: "coach",
        totalSessions: sessionStats.totalSessions,
        totalEarnings: sessionStats.totalEarnings,
        sessionsByStatus: sessionStats.byStatus,
        avgRating: reviews?.avgRating?.toFixed(1) || 0,
        totalReviews: reviews?.totalReviews || 0,
        upcomingSessions,
      });
    }

    // User dashboard stats
    else if (req.user.role === "user") {
      const userId = new ObjectId(req.user.id);

      // Count sessions
      const sessionStats = await db
        .collection("sessions")
        .aggregate([
          { $match: { userId, status: { $ne: "cancelled" } } },
          {
            $group: {
              _id: "$status",
              count: { $sum: 1 },
              totalSpent: {
                $sum: {
                  $cond: [{ $eq: ["$status", "completed"] }, "$price", 0],
                },
              },
            },
          },
        ])
        .toArray();

      const reviewCount = await db
        .collection("reviews")
        .countDocuments({ userId, status: { $ne: "deleted" } });

      const upcomingSessions = await db.collection("sessions").countDocuments({
        userId,
        status: { $in: ["pending", "confirmed"] },
        scheduledAt: { $gte: new Date() },
      });

      const summarized = sessionStats.reduce(
        (acc, s) => {
          acc.byStatus[s._id] = s.count;
          acc.totalSpent += s.totalSpent;
          acc.totalSessions += s.count;
          return acc;
        },
        { byStatus: {}, totalSpent: 0, totalSessions: 0 }
      );

      res.status(200).json({
        role: "user",
        totalSessions: summarized.totalSessions,
        totalSpent: summarized.totalSpent,
        sessionsByStatus: summarized.byStatus,
        totalReviews: reviewCount,
        upcomingSessions,
      });
    } else {
      return res.status(403).json({ error: "Invalid role" });
    }
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ error: "Server error while fetching dashboard" });
  }
});

module.exports = router;
