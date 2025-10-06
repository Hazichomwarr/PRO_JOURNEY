const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGO_URI);
const dbName = "touchpoint"; // adjust if yours differs

async function seed() {
  try {
    await client.connect();
    const db = client.db(dbName);

    const users = db.collection("users");
    const coaches = db.collection("coaches");
    const sessions = db.collection("sessions");
    const reviews = db.collection("reviews");

    // clear existing
    await Promise.all([
      users.deleteMany({}),
      coaches.deleteMany({}),
      sessions.deleteMany({}),
      reviews.deleteMany({}),
    ]);

    // --- USERS ---
    const userDocs = [
      {
        _id: new ObjectId(),
        firstName: "Ali",
        lastName: "Diallo",
        email: "ali@example.com",
        password: "hashed_password1",
        role: "user",
      },
      {
        _id: new ObjectId(),
        firstName: "Sara",
        lastName: "Ben",
        email: "sara@example.com",
        password: "hashed_password2",
        role: "user",
      },
      {
        _id: new ObjectId(),
        firstName: "Coach",
        lastName: "Musa",
        email: "musa@example.com",
        password: "hashed_password3",
        role: "coach",
      },
      {
        _id: new ObjectId(),
        firstName: "Coach",
        lastName: "Amina",
        email: "amina@example.com",
        password: "hashed_password4",
        role: "coach",
      },
    ];
    await users.insertMany(userDocs);

    // --- COACHES ---
    const coachDocs = [
      {
        _id: new ObjectId(),
        userId: userDocs[2]._id,
        bio: "Experienced fitness coach specialized in strength and endurance.",
        expertise: ["Fitness", "Strength"],
        hourlyRate: 40,
        availability: [
          { day: "Monday", slots: ["10:00-12:00", "14:00-16:00"] },
          { day: "Wednesday", slots: ["09:00-11:00"] },
        ],
      },
      {
        _id: new ObjectId(),
        userId: userDocs[3]._id,
        bio: "Life coach helping people build better habits.",
        expertise: ["Mindset", "Motivation"],
        hourlyRate: 60,
        availability: [
          { day: "Tuesday", slots: ["13:00-15:00"] },
          { day: "Thursday", slots: ["10:00-12:00"] },
        ],
      },
    ];
    await coaches.insertMany(coachDocs);

    // --- SESSIONS ---
    const sessionDocs = [
      {
        _id: new ObjectId(),
        userId: userDocs[0]._id, // Ali
        coachId: coachDocs[0]._id, // Musa
        date: new Date(),
        status: "completed",
      },
      {
        _id: new ObjectId(),
        userId: userDocs[1]._id, // Sara
        coachId: coachDocs[1]._id, // Amina
        date: new Date(),
        status: "completed",
      },
    ];
    await sessions.insertMany(sessionDocs);

    // --- REVIEWS ---
    const reviewDocs = [
      {
        _id: new ObjectId(),
        userId: userDocs[0]._id,
        coachId: coachDocs[0]._id,
        rating: 5,
        comment: "Amazing session, very motivating!",
        status: "approved",
        createdAt: new Date(),
      },
      {
        _id: new ObjectId(),
        userId: userDocs[1]._id,
        coachId: coachDocs[1]._id,
        rating: 4,
        comment: "Really helped me focus on my goals.",
        status: "approved",
        createdAt: new Date(),
      },
    ];
    await reviews.insertMany(reviewDocs);

    console.log("✅ Seeding complete!");
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    await client.close();
  }
}

seed();
