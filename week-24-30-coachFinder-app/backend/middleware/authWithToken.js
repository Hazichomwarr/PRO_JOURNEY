//middleware/authWithToken.js
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");

function authWithToken(requiredRole = null) {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];
      console.log(
        ">> INCOMING",
        req.method,
        req.originalUrl,
        "auth header present?",
        !!authHeader
      );

      if (!authHeader) {
        console.log("❌ No auth header");
        return res.status(401).json({ message: "No token" });
      }

      const token = authHeader.startsWith("Bearer ")
        ? authHeader.slice(7)
        : authHeader;

      console.log("🔑 ENV TOKEN SECRET:", process.env.ACCESS_TOKEN);

      const payload = jwt.verify(token, process.env.ACCESS_TOKEN);
      const userId = payload.id || payload._id;
      if (!userId || !ObjectId.isValid(userId)) {
        console.log("🚫 Invalid or missing userId:", userId);
        return res.status(400).json({ error: "Invalid ID in token", payload });
      }
      req.user = { id: userId, role: payload.role, email: payload.email };

      if (requiredRole && req.user.role !== requiredRole) {
        console.log("🚫 Role mismatch:", req.user.role);
        return res.status(403).json({ error: "Forbidden" });
      }
      console.log("🧍 Verified user:", req.user);

      // console.log("➡️ calling next()");
      next();
      console.log("✅ next() returned successfully");
    } catch (err) {
      console.log("💥 middleware error:", err.message);
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Access token expired" });
      }
      return res.status(401).json({ error: "Invalid access token" });
    }
  };
}

module.exports = authWithToken;
