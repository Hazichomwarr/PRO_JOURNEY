// routes/auth.js
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validateSignup = require("../../utils/validator");

const router = express.Router();

// REGISTER ROUTE
router.post("/register", async (req, res) => {
  const db = req.app.locals.db;

  const { error, value } = validateSignup(req.body);
  if (error) {
    return res.status(400).json(error.details);
  }
  console.log("value:", value);

  //Omit confirmPassword value
  const { confirmPassword, password, ...values } = value;

  //Check email's uniqueness
  const existing = await db
    .collection("users")
    .findOne({ email: values.email });
  if (existing)
    return res.status(409).json({ message: "email already exists" });

  //Add newUser to db with hashed password
  const hashed = await bcrypt.hash(password, 12);
  const newUser = await db
    .collection("users")
    .insertOne({ ...values, password: hashed });
  res.status(201).json({
    id: newUser.insertedId.toString(),
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
  });
});

//LOGIN ROUTE
router.post("/login", async (req, res) => {
  const db = req.app.locals.db;

  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json();

  const user = await db.collection("users").findOne({ email });
  if (!user) return res.status(403).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(403).json({ message: "Invalid credentials" });

  //since authenticate, let's give user a token
  const payload = {
    id: user._id.toString(),
    email: user.email,
    role: user.role,
  };
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN);

  //store refresh token in DB
  await db
    .collection("refreshTokens")
    .insertOne({ token: refreshToken, userId: user._id, createAt: new Date() });

  res.json({ accessToken, refreshToken });
});

//REFRESH TOKEN ROUTE
router.post("/refresh", async (req, res) => {
  const db = req.app.locals.db;

  try {
    //1.get token from the post's body
    const { token } = req.body;
    if (!token) return res.sendStatus(401); //unauthorized

    //2. make sure the token is still in the db
    const found = await db.collection("refreshTokens").findOne({ token });
    if (!found)
      return res.status(403).json({ message: "Invalid refresh token" });

    //3. make sure the token hasn't been tampered with
    jwt.verify(token, process.env.REFRESH_TOKEN, (err, payload) => {
      if (err)
        return res.status(403).json({ message: "Token expired or invalid" });

      const newAccessToken = jwt.sign(
        { id: payload.id, email: payload.email },
        process.env.ACCESS_TOKEN,
        { expiresIn: "15m" }
      );
      res.json({ accessToken: newAccessToken });
    });
  } catch (err) {
    res.status.json({ message: "Server error" });
  }
});

//LOGOUT ROUTE
router.delete("/logout", async (req, res) => {
  const db = req.app.locals.db;

  const { token } = req.body;
  if (!token) return res.sendStatus(400); //bad request

  try {
    await db.collection("refreshTokens").deleteOne({ token });
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
