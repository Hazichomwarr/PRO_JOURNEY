//server.js
require("dotenv").config();

const express = require("express");
const connectDB = require("./db");
const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());

let refreshTokens = [];

let db;

(async () => {
  db = await connectDB();
})();

// ----------------------AUTH----------------------------------

//to create a token, use 'POST'
app.post("/login", async (req, res) => {
  //Authentication
  const { username, password } = req.body;

  try {
    const newUser = await db
      .collection("users")
      .findOne({ username: username.toString().toLowerCase() });
    console.log("loggin user:", newUser);
    if (!newUser) return res.status(403).json({ message: "Not Allowed" });
    if (await bcrypt.compare(password, newUser.password)) {
      //Authorization: create token
      const user = { name: username };
      const accessToken = generateAccessToken({
        id: user._id,
        name: user.username,
      });
      const refreshToken = jwt.sign(
        { id: user._id, name: user.username },
        process.env.REFRESH_TOKEN_SECRET
      );

      refreshTokens.push(refreshToken);
      res.json({ accessToken, refreshToken });
    } else {
      console.log("old ->", password, "different of new->", newUser.password);
      res.status(403).json({ message: "Invalid credentials" });
    }
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

//refresh token route
app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    const newAccessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken: newAccessToken });
  });
});

//Logout route (invalidate refresh token)
app.delete("/logout", (req, res) => {
  const refreshToken = req.body.token;
  refreshTokens = refreshTokens.filter((t) => t !== refreshToken);
  console.log(refreshTokens);
  res.sendStatus(204);
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30s" });
}

// ----------------------USERS-----------------------------------

//All Users
app.get("/users", async (req, res) => {
  const users = await db.collection("users").find().toArray();
  const names = users.map((u) => {
    return {
      name: u.username,
      id: u._id.toString(),
    };
  });
  res.json(names);
});

//Create New User
app.post("/users", async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await db
      .collection("users")
      .insertOne({ username, password: hashedPassword });
    res.status(201).json({ status: "success", newUser });
  } catch (err) {
    res.status(500).json({ message: "Something went Wrong!" });
  }
});

// -------------------------POSTS---------------------------------------

//Get all Posts
app.get("/posts", async (req, res) => {
  const allPosts = await db.collection("posts").find().toArray();
  res.json(allPosts);
});

// Create new post
app.post("/posts", authenticateToken, async (req, res) => {
  const newPost = {
    text: req.body.text,
    userId: req.user.id,
    createAt: new Date(),
  };
  const result = await db.collection("posts").insertOne(newPost);
  res.json(result);
});

//Get a single user's posts
app.get("/users/:id/posts", authenticateToken, async (req, res) => {
  const userPosts = await db
    .collection("posts")
    .find({ userId: new ObjectId(req.params.id) })
    .toArray();
  res.json(userPosts);
});

// middleware auth
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ error: 401, message: "Access denied. No token provided" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 403, message: "Not Authorized" });
    }
    req.user = user;
    next();
  });
}

app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
