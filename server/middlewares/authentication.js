const jwt = require("jsonwebtoken");
const User = require("../models/users.model");

const authToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const authUser = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(authUser.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Invalid or expired token", error: err.message });
  }
};

const authAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Insufficient privileges" });
  }

  next();
};

module.exports = { authToken, authAdmin };
