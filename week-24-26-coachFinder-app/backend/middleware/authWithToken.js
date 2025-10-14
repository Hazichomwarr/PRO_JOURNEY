// ///middleware/authWithToken.js
const jwt = require("jsonwebtoken");

// function authWithToken(requiredRole = null) {
//   return (req, res, next) => {
//     try {
//       const authHeader = req.headers["authorization"];
//       if (!authHeader) return res.status(401).json({ message: "No token" });

//       //Bearer or raw token extraction
//       const token = authHeader.startsWith("Bearer ")
//         ? authHeader.split(" ")[1]
//         : authHeader;
//       if (!token)
//         return res
//           .status(401)
//           .json({ error: "Malformed Authorization header" });

//       const payload = jwt.verify(token, process.env.ACCESS_TOKEN);

//       //attach info to request
//       req.user = {
//         id: payload.id,
//         role: payload.role,
//         email: payload.email,
//       };
//       //optional role check (authorization)
//       if (requiredRole && req.user.role !== requiredRole) {
//         return res.status(403).json({ error: "Forbidden" });
//       }
//       console.log("authWithToken running, token:", token);
//       next();
//     } catch (err) {
//       if (err.name === "TokenExpiredError") {
//         return res.status(401).json({ error: "Access token expired" });
//       }
//       return res.status(401).json({ error: "Invalid access token" });
//     }
//   };
// }

// module.exports = authWithtoken;

function authWithToken(requiredRole = null) {
  return (req, res, next) => {
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

      const payload = jwt.verify(token, process.env.ACCESS_TOKEN);
      console.log("✅ Token verified:", payload);

      req.user = { id: payload.id, role: payload.role, email: payload.email };

      if (requiredRole && req.user.role !== requiredRole) {
        console.log("🚫 Role mismatch:", req.user.role);
        return res.status(403).json({ error: "Forbidden" });
      }

      console.log("➡️ calling next()");
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
