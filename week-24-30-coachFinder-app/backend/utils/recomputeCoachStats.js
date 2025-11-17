const { ObjectId } = require("mongodb");

async function recomputeCoachesStats(db, coachId) {
  const reviews = await db
    .collection("reviews")
    .find({ coachId: new ObjectId(coachId), status: { $ne: "deleted" } })
    .toArray();

  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
      : null;

  //Update coach doc
  await db.collection("coaches").updateOne(
    { _id: new ObjectId(coachId) },
    {
      $set: {
        totalReviews,
        averageRating,
        updateAt: new Date(),
      },
    }
  );
}
module.exports = recomputeCoachesStats;
