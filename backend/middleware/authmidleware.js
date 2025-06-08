const Jwt = require("jsonwebtoken");
const User = require("../model/User.js");

const protectRoute = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Bearer <token>

    const decode = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decode.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();

  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Unauthorized - Access token expired" });
    }
    console.log("Error in protectedRoute middleware:", error);
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

module.exports = { protectRoute };
