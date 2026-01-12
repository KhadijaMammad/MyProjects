const jwt = require("jsonwebtoken");
require("dotenv").config();

const AuthMiddleware = (req, res, next) => {
  // Həm böyük, həm kiçik hərf ehtimalını yoxlayırıq
  const authHeader = req.headers.authorization || req.headers.Authorization;
  console.log("Req Headers:", req.headers);

  console.log("--- AUTH DEBUG ---");
  console.log("1. Gələn Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    console.log("XƏTA: Header yoxdur və ya Bearer ilə başlamır!");
    return res.status(401).json({ status: 401, message: "Token tapılmadı!" });
  }

  const token = authHeader.split(" ")[1];
  console.log("2. Split edilmiş Token:", token ? token.substring(0, 20) + "..." : "Yoxdur");

  try {
    const secret = process.env.JWT_SECRET || "change_this_secret";
    console.log("3. İstifadə olunan Secret:", secret === "change_this_secret" ? "DEFUALT (Təhlükəli)" : "ENV-dən gələn");

    const decoded = jwt.verify(token, secret);
    
    console.log("4. Token Uğurla Yoxlanıldı. User ID:", decoded.user_id || decoded.id);
    req.user = decoded;

    next();
  } catch (error) {
    console.log("XƏTA: JWT Doğrulanmadı!");
    console.log("Səbəb:", error.message);

    // Əgər vaxtı bitibsə
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ status: 401, message: "Tokenin vaxtı bitib!" });
    }

    return res.status(403).json({ status: 403, message: "Token keçərsizdir!" });
  }
};

module.exports = AuthMiddleware;