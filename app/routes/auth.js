const authController = require('../controllers/authcontroller.js');

module.exports = (app) => {
  app.get('/signup', authController.signup);
};

app.get('/signin', authController.signin);