const reviewSchema = {
  _id: ObjectId,
  coachId: ObjectId,
  userId: ObjectId,
  sessionId: ObjectId, // optional but good to tie to a session
  rating: Number, // 1-5
  comment: String,
  createdAt: ISODate,
};

//routes/reviews.js
