
const authController = require('../controllers/authcontroller.js');

module.exports = (app, passport) => {
  // app.get('/', (req, res) => {
  //   signin();
  //   // res.send('Welcome to Passport with Sequelize');
  // });
  app.get('/', authController.signin);

  app.get('/signup', authController.signup);

  app.get('/signin', authController.signin);

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/signup'
  }));

  app.get('/dashboard', isLoggedIn, function (req, res) {
    authController.dashboard(req, res);
    });

  app.get('/logout', authController.logout);

  app.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/dashboard',
    failureRedirect: '/signin',
  }));

  app.post("/listAll", function(req, res) {
    authController.listAll(req, res);
  });

  app.get("/listAll", function(req, res) {
    authController.listAll(req, res);
  });

  app.post("/findNew", function(req, res) {
    console.log("in auth, at the find new post");
    authController.findNew(req, res);
  });

  app.get("/findNew", function(req, res) {
    console.log("in auth, at the find new get");
    authController.findNew(req, res);
  });


  app.get("/addBeer", function(req, res) {
    console.log("in auth, got the add beer post");
    console.log(req.query);
    authController.addBeer(req, res, function(){
      return
    });
  });

  app.post("/deleteBeer", function(req, res){
    console.log(req.body);
    authController.delBeer(req, res);
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/signin');
  };

// end exports 
};

