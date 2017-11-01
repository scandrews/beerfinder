var exports = module.exports = {};
const algorithms = require('../config/algorithms.js');


exports.dashboard = (req, res) => {
  console.log("we're in the dashboard authcontroller");
  const junk = 'string';
  algorithms.getBeerOfTheDay(res, (beerOTD) => {
    console.log(beerOTD);
    res.render('dashboard', beerOTD);
  });
};


exports.listAll = function (req, res) {
  console.log("we're in the / post");
  algorithms.listAll(res, (dbBeer) => {
    	console.log(dbBeer);
    // res.render('dashboard', dbBeer);
    // res.json(dbBeer);
  });
};

exports.findNew = function (req, res) {
  console.log('the start of find new');
  console.log(req.body.matchName);
  algorithms.matchBeer(res, req.body.matchName);
  // console.log('In the find new');
  // res.json(results);
};

exports.addBeer = function (req, res) {
  console.log("got addBeer in authcontroller");
  algorithms.addNewBeer(req, res);
}