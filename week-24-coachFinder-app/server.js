//server.js
require("dotenv").config();
const express = require("express");
const connecDB = require("./db");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const coachRoutes = require("./routes/coaches");

const app = express();
app.use(express.json())(async () => {
  const db = await connecDB();
  app.locals.db = db;
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/coaches", coachRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`✅ Server running on port ${port}`));
