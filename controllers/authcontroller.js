var exports = module.exports = {};
const algorithms = require('../config/algorithms.js');

exports.signup = (req, res) => {
  console.log("we're in the signUP authcontroller");
  res.render('dashboard');
};

exports.signin = (req, res) => {
  console.log("we're in the signIN authcontroller");
  res.render('index');
};


exports.dashboard = (req, res) => {
  console.log("we're in the dashboard authcontroller");
  const junk = 'string';
  algorithms.getBeerOfTheDay(req, res);
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/');
  });
};

exports.listAll = function (req, res) {
  console.log("we're in authcontroler list all");
  algorithms.listAll(req, res);
};

exports.findNew = function (req, res) {
  console.log('the start of find new - authcontroller');
  console.log(req.body.matchName);
  algorithms.matchBeer(req, res);
  // console.log('In the find new');
  // res.json(results);
};

exports.addBeer = function (req, res) {
  console.log("in authcontroller add beer");
  algorithms.addNewBeer(req, res);
}

exports.delBeer = function (req, res) {
  console.log("in authcontroller delete beer");
  console.log(req.body);
  algorithms.deleteBeer(req, res);
}
