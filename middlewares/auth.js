// middleware/auth.js
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// middleware function to check for a valid JWT
const checkAuth = (req, res, next) => {
  // check for a token in the header, query string, or request body
  const token = req.headers["x-access-token"] || req.query.token || req.body.token;

  // if no token is found, return an error
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // if a token is found, verify it
  jwt.verify(token, keys.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // if the token is valid, add the user's ID to the request object
    req.userId = decoded.userId;
    next();
  });
};

module.exports = { checkAuth };
