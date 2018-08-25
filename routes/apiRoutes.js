var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.User.findAll({}).then(function(GTdb) {
      res.json(GTdb);
    });
  });

  app.get("/api/profile/:name", function(req, res) {
    db.User.findOne({ where: { firstName: req.params.name } }).then(function(GTdb) {
      res.json(GTdb);
    });
  });

  // Create a new example
  app.post("/", function(req, res) {
    db.User.create(req.body).then(function(GTdb) {
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
