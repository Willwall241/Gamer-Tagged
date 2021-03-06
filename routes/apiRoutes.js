var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    console.log("apiRoutes: User Logged In " + req.user.id);
    res.json("/");
  });

  app.get(
    "/auth/facebook",
    passport.authenticate("facebook", {
      scope: ["public_profile", "email"]
    })
  );

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: "/login" }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect("/");
    }
  );

  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile"]
    })
  );
  // callback route for google to redirect to
  // hand control to passport to use code to grab profile info
  app.get("/auth/google/redirect", passport.authenticate("google"), function(
    req,
    res
  ) {
    res.send("you reached the redirect URI");
    console.log(res);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create(req.body)
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        console.log(err);
        res.json(err);
        // res.status(422).json(err.errors[0].message);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // // Get profile
  // app.get("/api/profile/:username", function(req, res) {
  //   db.User.findOne({
  //     where: { id: req.params.username }
  //   }).then(function(GTdb) {
  //     res.json(GTdb);
  //   });
  // });
  // // profile search
  // app.get("/api/profile/:name", function(req, res) {
  //   db.User.findOne({
  //     where: { firstName: req.params.name }
  //   }).then(function(GTdb) {
  //     res.json(GTdb);
  //   });
  // });

  // // Create a new profile
  // app.post("/", function(req, res) {
  //   db.User.create(req.body).then(function(GTdb) {
  //     res.json(GTdb);
  //   });
  // });
  // // Create a new game
  // app.post("/library", function(req, res) {
  //   db.Library.create(req.body).then(function(GTdb) {
  //     res.json(GTdb);
  //   });
  // });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        username: req.user.userName,
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // for friend search
  // app.get("/api/friend/search/:name", function(req, res) {
  //   db.User.findAll({
  //     where: { firstName: req.params.name }
  //   }).then(function(GTdb) {
  //     data = {
  //       friends: GTdb
  //     };
  //     res.render("indexTest", data);
  //     console.log(data.friends);
  //   });
  // });

  // add friende
  app.post("/api/friend/add/", function(req, res) {
    var id = req.body.image;
    console.log(id);
    db.Friend.create({
      image: id,
      UserId: req.user
    }).then(function(GTdb) {
      res.json(GTdb);
    });
  });

  // display friend's list
  app.get("/api/friend/list", function(req, res) {
    db.Friend.findAll({
      where: {
        UserId: req.user
      }
    }).then(function(GTdb) {
      res.json(GTdb);
    });
  });

  // status change
  app.put("/api/status/", function(req, res) {
    db.User.update(req.body, {
      where: {
        id: req.body.id,
        UserId: req.user.id
      }
    }).then(function(GTdb) {
      console.log(GTdb);
      res.json(GTdb);
    });
  });

  // edit profile
  app.put("/api/edit/", function(req, res) {
    console.log(req.body);
    db.User.update(req.body, {
      where: {
        id: req.user
      }
    }).then(function(GTdb) {
      res.json(GTdb);
    });
  });

  // Create a new game
  app.post("/api/library", function(req, res) {
    console.log(req.user);
    db.Library.create({
      gameID: req.body.gameID,
      UserId: req.user
    }).then(function(GTdb) {
      res.json(GTdb);
    });
  });
  app.get("/api/library", function(req, res) {
    db.Library.findAll({
      where: { UserId: req.user }
    }).then(function(results) {
      res.json(results);
    });
  });

  // get friend
  app.get("/api/friend/search/:name", function(req, res) {
    db.User.findAll({
      where: { firstName: req.params.name }
    }).then(function(GTdb) {
      res.json(GTdb);
    });
  });
};
// module.exports = function(app) {
//   // Get all examples
//   app.get("/api/examples", function(req, res) {
//     db.User.findAll({}).then(function(GTdb) {
//       res.json(GTdb);
//     });
//   });

//   app.get("/api/profile/:name", function(req, res) {
//     db.User.findOne({
//       where: { firstName: req.params.name }
//     }).then(function(GTdb) {
//       res.json(GTdb);
//     });
//   });

//   // Create a new example
//   app.post("/", function(req, res) {
//     db.User.create(req.body).then(function(GTdb) {
//       res.json(GTdb);
//     });
//   });

//   // Delete an example by id
//   app.delete("/api/examples/:id", function(req, res) {
//     db.User.destroy({
//       where: { id: req.params.id }
//     }).then(function(GTdb) {
//       res.json(GTdb);
//     });
//   });
// };
