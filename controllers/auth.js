
const authController = require('../controllers/authcontroller.js');

module.exports = (app) => {

  app.get('/', function(req, res) {
    console.log("In Auth /");
    authController.dashboard(req, res);
  });

  app.get('/dashboard', function(req, res) {
    console.log("In Auth, /dashboard");
    authController.dashboard(req, res);
  });

  app.post("/listAll", function(req, res) {
    authController.listAll(req, res);
  });

  app.post("/findNew", function(req, res) {
    console.log("at the find new post");
    authController.findNew(req, res);
  });

  app.get("/findNew", function(req, res) {
    console.log("at the find new get");
    authController.findNew(req, res);
  });

  app.post("/addBeer", function(req, res) {
    console.log("got the add beer post");
    authController.addBeer(req, res);
  });


// end exports 
};

