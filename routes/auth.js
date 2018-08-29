module.exports = function (app, passport) {

  app.get('/signup', authController.signup);


  app.get('/signin', authController.signin);


  app.post('/signup', passport.authenticate('local-signup', {
      successRedirect: '/dashboard',
      failureRedirect: '/signup'
  }
  ));


  app.get('/dashboard', isLoggedIn, authController.dashboard);


  app.get('/logout', authController.logout);


  app.post('/signin', passport.authenticate('local-signin', {
      successRedirect: '/dashboard',
      failureRedirect: '/signin'
  }
  ));

  app.get('/google', authController.google);



      // auth with google+
  app.get('/auth/google', passport.authenticate('google', {
      scope: ['profile']
  }
));

  // callback route for google to redirect to
  // hand control to passport to use code to grab profile info
  app.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
      res.send('you reached the redirect URI');
      console.log(res);
  });


  function isLoggedIn(req, res, next) {
      if (req.isAuthenticated())
          return next();

      res.redirect('/signin');
  }


}