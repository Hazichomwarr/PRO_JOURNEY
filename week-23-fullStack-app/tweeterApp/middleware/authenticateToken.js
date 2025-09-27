const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: 401, message: "No token provided" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err)
      return res.status(403).json({ error: 403, message: "Not authorized" });

    req.user = payload;
    next();
  });
}

module.exports = authenticateToken;
