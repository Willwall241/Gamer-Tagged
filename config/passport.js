var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var GoogleStrategy = require("passport-google-oauth20").Strategy;
var FacebookStrategy = require("passport-facebook").Strategy;

var db = require("../models");

passport.use(
  new FacebookStrategy(
    {
      clientID: 682482918784174,
      clientSecret: "fdb87be80604d199287fad69ee2ab6e7",
      callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      User.findOrCreate(
        {
          facebookId: profile.id
        },
        function(err, user) {
          return cb(err, user);
        }
      );
    }
  )
);
passport.use(
  new GoogleStrategy(
    {
      // options for google strategy
      clientID:
        "991930859037-hdpvh9canllo137jk1ddhpvo4cpk9o8p.apps.googleusercontent.com",
      clientSecret: "VQMcBN_c97Lhj_GCbFxjtfSu",
      callbackURL: "/auth/google/redirect"
    },
    function(accessToken, refreshToken, profile, done) {
      // passport callback function
      console.log("passport callback function fired:");
      console.log(profile.id);
      return done(err, user);
    }
  )
);

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(
  new LocalStrategy(
    // Our user will sign in using an email, rather than a "username"
    {
      usernameField: "email"
    },
    function(email, password, done) {
      // When a user tries to sign in this code runs
      db.User.findOne({
        where: {
          email: email
        }
      }).then(function(dbUser) {
        // If there's no user with the given email
        if (!dbUser) {
          return done(null, false, {
            message: "Incorrect email."
          });
        }
        // If there is a user with the given email, but the password the user gives us is incorrect
        else if (!dbUser.validPassword(password)) {
          return done(null, false, {
            message: "Incorrect password."
          });
        }
        // If none of the above, return the user
        return done(null, dbUser);
      });
    }
  )
);

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  cb(null, id);
});

// Exporting our configured passport
module.exports = passport;
