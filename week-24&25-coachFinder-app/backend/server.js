//backend/server.js
require("dotenv").config();
const express = require("express");
const connecDB = require("./db");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const coachRoutes = require("./routes/coaches");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"], // Vite default
    credentials: true,
  })
);

//Connect to db before setting routes
(async () => {
  const db = await connecDB();
  app.locals.db = db;

  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/coaches", coachRoutes);

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`✅ Server running on port ${port}`));
})();
