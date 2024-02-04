import { addUser } from "./User.controller.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import CONFIG from "../config/db.js";
import "../auth/passport.config.js";

// Create token with a payload function
const createToken = (user) => {
  return jwt.sign(
    { id: user._id, type: user.username, email: user.email },
    CONFIG.JWT_SECRET,
    {
      expiresIn: 86400,
    },
  );
};

export const register = async (req, res) => {
  return addUser(req, res);
};

export const login = (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    // Generate a JSON response reflecting authentication status
    if (!user) {
      return res.send({ success: false, message: "authentication failed" });
    } else {
      req.user = user;
      return res.status(200).json({ user, token: createToken(user) });
    }
  })(req, res, next);
};

// Middleware to check token before each request
export const authorizeJWT = (req, res, next) => {
  passport.authenticate("jwt", function (err, user, info) {
    if (err) {
      return res.status(401).json({ status: 401, code: "Unauthorized" });
    }
    if (!user) {
      return res.status(401).json({ status: 401, code: "Unauthorized" });
    } else {
      req.user = user;
      return next();
    }
  })(req, res, next);
};

// Middleware to check token before each videos request
export const authorizeVideosJWT = (req, res, next) => {
  passport.authenticate("jwt", function (err, user, info) {
    if (!user) {
      return next();
    } else {
      req.user = user;
      return next();
    }
  })(req, res, next);
};
