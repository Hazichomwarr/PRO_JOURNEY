const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();

//login
router.post("/login", async (req, res) => {
  const db = req.app.locals.db; //pulled directly from the app
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "username & password required" });
  }
  //findout wether user credentials are valid with db's.
  const user = await db.collection("users").findOne({ username });
  if (!user) return res.status(403).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(403).json({ message: "Invalid credentials" });

  const payload = { id: user._id.toString(), name: user.username };
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "3m",
  });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);

  // store refresh token in DB (or in-memory for simple apps).
  await db
    .collection("refreshTokens")
    .insertOne({ token: refreshToken, userId: user._id, createAt: new Date() });

  res.json({ accessToken, refreshToken });
});

//refresh token
router.post("/token", async (req, res) => {
  const db = req.app.locals.db;

  //1.get token from the post's body
  const { token } = req.body;
  if (!token) return res.sendStatus(401); //unauthorized

  //2. make sure the token is still in the db
  const found = await db.collection("refreshTokens").findOne({ token });
  if (!found) return res.sendStatus(403); //forbidden

  //3. make sure that the token hasn't been tampered with
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
    if (err) return res.sendStatus(403); //forbidden
    const newAccessToken = jwt.sign(
      { id: payload.id, name: payload.name },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "3m",
      }
    );
    res.json({ accessToken: newAccessToken });
  });
});

//Logout
router.delete("/logout", async (req, res) => {
  const db = req.app.locals.db;
  const { token } = req.body;
  if (!token) return res.sendStatus(400); //bad request

  //no need to verify if token has been tampered with.
  //since user's requested log, logging out straight
  await db.collection("refreshTokens").deleteOne({ token });
  res.sendStatus(204);
});

module.exports = router;
