var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.User.findAll({}).then(function(GTdb) {
      res.render("indexTest", {
        msg: "Welcome!",
        examples: GTdb
      });
    });
  });

  app.get("/library", function(req, res) {
    res.render("library");
  });

  app.get("/splash", function(req, res) {
    res.render("splash");
  });

  app.get("/aboutUs", function(req, res) {
    res.render("aboutUs");
  });

  app.get("/index", function(req, res) {
    res.render("index");
  });

  // Load example page and pass in an example by id
  app.get("/profile/:username", function(req, res) {
    db.User.findOne({ where: { userName: req.params.username } }).then(function(
      profile
    ) {
      res.render("profile", {
        user: profile
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
