//backend/server.js
require("dotenv").config();
const express = require("express");
const connecDB = require("./db");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const coachRoutes = require("./routes/coaches");

const app = express();
// top of server.js, right after app = express()
app.use((req, res, next) => {
  console.log(
    ">> INCOMING",
    new Date().toISOString(),
    req.method,
    req.url,
    "auth header present?",
    !!req.headers.authorization
  );
  next();
});
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);

//Connect to db before setting routes
(async () => {
  const db = await connecDB();
  app.locals.db = db;

  app.use("/api/auth", authRoutes);
  console.log("✅ auth routes mounted");
  app.use("/api/users", userRoutes);
  app.use("/api/coaches", coachRoutes);

  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`✅ Server running on port ${port}`));
})();
