const createError = require("./error");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authheader = req.headers.token;
  if (!authheader) {
    return next(createError(401, "You are not authenticated"));
  }

  const token = authheader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(createError(403, "Token is not valid"));
    req.user = user;
    next();
  });
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("You are not authorized");
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("You are not authorized");
    }
  });
};

module.exports = { verifyToken, verifyUser, verifyAdmin };
