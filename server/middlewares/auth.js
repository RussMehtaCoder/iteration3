const admin = require("../utils/firebaseAdmin");
const User = require("../models/user");

const checkFirebaseToken = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res.status(401).send("Unauthorized: No token provided.");
  }

  const token = authorizationHeader.split("Bearer ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);

    const user = await User.findOne({ fireBaseId: decodedToken.uid });

    if (!user) {
      return res.status(404).send("User not found in MongoDB.");
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.code === "auth/id-token-expired") {
      res.status(401).send("Unauthorized: Token expired.");
    } else {
      res.status(403).send("Unauthorized: Invalid token.");
    }
  }
};

module.exports = { /* authenticate, authenticateToken,  */ checkFirebaseToken };

/* const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authenticateToken = async (token) => {
  if (!token) {
    throw new Error("Authentication required");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    req.user = await authenticateToken(token);
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}; */
