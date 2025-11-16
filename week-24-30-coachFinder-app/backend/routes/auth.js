// routes/auth.js
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validateSignup } = require("../utils/validator");
const upload = require("../middleware/upload");

const router = express.Router();

// REGISTER ROUTE
router.post("/register", upload.single("image"), async (req, res) => {
  const db = req.app.locals.db;

  const { error, value } = validateSignup(req.body);
  if (error) {
    return res.status(400).json(error.details);
  }

  //Extract URL from cloudinary
  const imageURL = req.file ? req.file.path : "";

  //Omit 'password' and 'confirmPassword' value
  const { confirmPassword, password, ...values } = value;

  //Attach image URL
  const payload = { ...values, image: imageURL };

  try {
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
      .insertOne({ ...payload, password: hashed });

    // return json
    res.status(201).json({
      id: newUser.insertedId.toString(),
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
    });
  } catch (err) {
    console.log("registration error", err);
    res.status(500).json({ error: "Server Error" });
  }
});

//LOGIN ROUTE
router.post("/login", async (req, res) => {
  // console.log("1. Inside /login");
  const db = req.app.locals.db;
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json();
  // console.log("2.Got email and password");

  const user = await db.collection("users").findOne({ email });
  if (!user) return res.status(403).json({ message: "Invalid credentials" });
  // console.log("3.Got user from DB ->", user);

  // renamed "password" bc previous name variable in use already.
  // userData to set right away the user in the userStore frontend
  const { password: pwd, confirmPassword: confirmPwd, ...userData } = user;

  //Authenticate the password
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(403).json({ message: "Invalid credentials" });
  // console.log("4. User password verification success!");

  //since authenticate, let's give the user a token
  const payload = {
    id: user._id.toString(),
    email: user.email,
    role: user.role,
  };
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, {
    expiresIn: "15m",
  });
  //console.log("5.AccessToken created for user ->", accessToken);
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN);

  //store refresh token in DB
  await db
    .collection("refreshTokens")
    .insertOne({ token: refreshToken, userId: user._id, createAt: new Date() });
  //console.log("6. Access Token saved in DB successfully!");

  //Data for the frontEnd
  res.json({ accessToken, refreshToken, user: userData });
});

//REFRESH TOKEN ROUTE
router.post("/refresh", async (req, res) => {
  const db = req.app.locals.db;

  try {
    //1.get token from the post's body
    const { refreshToken } = req.body;
    if (!refreshToken)
      return res.status(401).json({ message: "No refresh token" }); //unauthorized

    //2. make sure the token is still in the db
    const found = await db
      .collection("refreshTokens")
      .findOne({ token: refreshToken });
    if (!found)
      return res.status(403).json({ message: "Invalid refresh token" });

    //3. make sure the token hasn't been tampered with
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, payload) => {
      if (err) {
        console.log("❌ Refresh token verification failed:", err.message);
        return res.status(403).json({ message: "Token expired or invalid" });
      }

      const newAccessToken = jwt.sign(
        { id: payload.id, email: payload.email, role: payload.role },
        process.env.ACCESS_TOKEN,
        { expiresIn: "15m" }
      );
      res.json({ accessToken: newAccessToken });
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
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
