import passport from "passport";
import passportLocal from "passport-local";
import passportJwt from "passport-jwt";

import User from "../models/User.model.js";
import config from "../config/db.js";

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const optionsLocalStrategy = {
  usernameField: "email",
};

passport.use(
  new LocalStrategy(optionsLocalStrategy, async (email, password, done) => {
    const user = await User.findOne({ email: email });
    if (user) {
      user
        .comparePassword(password)
        .then((isMatch) => {
          if (isMatch) return done(undefined, user);
          return done(undefined, false, {
            message: "Invalid Credentials",
          });
        })
        .catch((err) => {
          return done(err);
        });
    } else {
      return done(undefined, false, {
        message: `User: ${email} not found.`,
      });
    }
  }),
);

const optionsJWT = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_SECRET,
};

/*
  We authorize the user to enter a route
*/
passport.use(
  new JwtStrategy(optionsJWT, async (payload, done) => {
    //console.log("payload: ", payload);
    try {
      const user = await User.findById(payload.id);
      //console.log(user);
      if (user) return done(null, user);
      else
        return done(null, user, {
          message: "User not found",
        });
    } catch (error) {
      return done(null, false);
    }
  }),
);
