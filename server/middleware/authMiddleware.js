const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ status: 401, message: "Token tapılmadı!" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "change_this_secret"
    );

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(403).json({ status: 403, message: "Token keçərsizdir!" });
  }
};

module.exports = authMiddleware;
