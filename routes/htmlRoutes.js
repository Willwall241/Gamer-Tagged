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

  // Load example page and pass in an example by id
  app.get("/profile/:id", function(req, res) {
    db.User.findOne({ where: { id: req.params.id } }).then(function(GTdb) {
      res.render("example", {
        example: GTdb
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
