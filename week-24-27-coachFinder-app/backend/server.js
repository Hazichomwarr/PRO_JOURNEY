//backend/server.js
require("dotenv").config();
const express = require("express");
const connecDB = require("./db");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const coachRoutes = require("./routes/coaches");
const dashboardRoutes = require("./routes/dashboard");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);
// app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
//Connect to db before setting routes
(async () => {
  const db = await connecDB();
  app.locals.db = db;

  app.use("/api/auth", authRoutes);
  console.log("✅ auth routes mounted");
  app.use("/api/users", userRoutes);
  app.use("/api/coaches", coachRoutes);
  app.use("/api/dashboard", dashboardRoutes);

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`✅ Server running on port ${port}`));
})();
