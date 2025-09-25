require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

const posts = [
  { username: "Kyle", title: "Post 1" },
  { username: "Issa", title: "please subscribe" },
];

app.get("/posts", authenticateToken, (req, res) => {
  const posts = posts.filter((p) => p.username === req.user.name);
  res.json(posts);
});

//to create a token, use 'POST'
app.post("/login", (req, res) => {
  //Authenticate User first

  //Authorization: create token
  const username = req.body.username;
  const user = { name: username };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken: accessToken });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split("")[1];

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
