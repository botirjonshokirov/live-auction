const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.get("x-auth-token");
  // If no token
  if (!token) {
    return res
      .status(401)
      .json({ errors: [{ msg: "Invalid token, not logged in" }] });
  }
  // Verify token
  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verifiedToken.user;

    // Check user's role
    if (req.user.role === "admin") {
      // If user is an admin, allow access to all actions
      next();
    } else {
      // If user is not an admin, restrict certain actions
      const { method, path } = req;

      // Restrict delete actions
      if (method === "DELETE") {
        return res
          .status(403)
          .json({ errors: [{ msg: "Forbidden, not authorized to delete" }] });
      }

      // Restrict edit actions
      if (method === "PUT" && path.startsWith("/ad")) {
        return res
          .status(403)
          .json({ errors: [{ msg: "Forbidden, not authorized to edit" }] });
      }

      // Allow access to other actions
      next();
    }
  } catch (err) {
    res.status(401).json({ errors: [{ msg: "Invalid token" }] });
  }
};
