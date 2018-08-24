var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.User.findAll({}).then(function(GTdb_user) {
      res.render("indexTest", {
        msg: "Welcome!",
        examples: GTdb_user
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.User.findOne({ where: { id: req.params.id } }).then(function(GTdb_user) {
      res.render("example", {
        example: GTdb_user
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
