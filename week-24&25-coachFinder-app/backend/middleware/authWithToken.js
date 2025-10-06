const jwt = require("jsonwebtoken");

function authWithtoken(requiredRole = null) {
  return (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];
      if (!authHeader) return res.status(401).json({ message: "No token" });

      //Bearer or raw token extraction
      const token = authHeader.startsWith("Bearer ")
        ? authHeader.slice(7)
        : authHeader;
      if (!token)
        return res
          .status(401)
          .json({ error: "Malformed Authorization header" });

      const payload = jwt.verify(token, process.env.ACCESS_TOKEN);

      //attach info to request
      req.user = {
        id: payload.id,
        role: payload.role,
        email: payload.email,
      };
      //optional role check (authorization)
      if (requiredRole && req.user.role !== requiredRole) {
        return res.status(403).json({ error: "Forbidden" });
      }
      next();
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Access token expired" });
      }
      return res.status(401).json({ error: "Invalid access token" });
    }
  };
}

module.exports = authWithtoken;
