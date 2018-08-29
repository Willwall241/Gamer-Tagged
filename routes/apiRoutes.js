var db = require("../models");

module.exports = function(app) {
  // Get profile
  app.get("/api/profile/:username", function(req, res) {
    db.User.findOne({
      where: { id: req.params.username }
    }).then(function(GTdb) {
      res.json(GTdb);
    });
  });
  // profile search
  app.get("/api/profile/:name", function(req, res) {
    db.User.findOne({
      where: { firstName: req.params.name }
    }).then(function(GTdb) {
      res.json(GTdb);
    });
  });

  // Create a new profile
  app.post("/", function(req, res) {
    db.User.create(req.body).then(function(GTdb) {
      res.json(GTdb);
    });
  });
  // Create a new game
  app.post("/library", function(req, res) {
    db.Library.create(req.body).then(function(GTdb) {
      res.json(GTdb);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.User.destroy({ where: { id: req.params.id } }).then(function(GTdb) {
      res.json(GTdb);
    });
  });
};
