var db = require("../models");

// Requiring path to so we can use relative routes to our HTML files
// var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/profile");
    } else {
      res.render("temp");
    }
  });

  app.get("/profile", isAuthenticated, function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      db.User.findOne({
        where: { id: req.user }
      }).then(function(userData) {
        res.render("profile", { user: userData });
      });
      console.log("success");
    }
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.render("members");
    console.log(req.user);
  });
  app.get("/library", function(req, res) {
    res.render("library");
  });
  app.get("/chat", function(req, res) {
    res.render("chatPage");
  });
  app.get("/friends", function(req, res) {
    res.render("friends");
  });
};

// module.exports = function(app) {
//   // Load index page
//   app.get("/", function(req, res) {
//     db.User.findAll({}).then(function(GTdb) {
//       res.render("indexTest", {
//         msg: "Welcome!",
//         examples: GTdb
//       });
//     });
//   });

//   app.get("/splash", function(req, res) {
//     res.render("splash");
//   });

//   // Load example page and pass in an example by id
//   app.get("/profile/:username", function(req, res) {
//     db.User.findOne({ where: { userName: req.params.username } }).then(function(
//       profile
//     ) {
//       res.render("profile", {
//         user: profile
//       });
//     });
//   });

//   app.get("/aboutUs", function(req, res) {
//     res.render("aboutUs");
//   });

//   app.get("/index", function(req, res) {
//     res.render("index");
//   });

//   // Load example page and pass in an example by id
//   app.get("/profile/:id", function(req, res) {
//     db.User.findOne({ where: { id: req.params.id } }).then(function(GTdb) {
//       res.render("example", {
//         example: GTdb
//       });
//     });
//   });

//   // Render 404 page for any unmatched routes
//   app.get("*", function(req, res) {
//     res.render("404");
//   });
// };
