var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.User.findAll({}).then(function(GTdb_user) {
      res.json(GTdb_user);
    });
  });

  // Create a new example
  app.post("/", function(req, res) {
    db.User.create(req.body).then(function(GTdb_user) {
      res.json(GTdb_user);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.User.destroy({ where: { id: req.params.id } }).then(function(GTdb_user) {
      res.json(GTdb_user);
    });
  });
};
