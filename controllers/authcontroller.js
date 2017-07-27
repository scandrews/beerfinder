var exports = module.exports = {};
var algorithms = require("../config/algorithms.js");

exports.signup = (req, res) => {
	console.log("we're in the signUP authcontroller")
  res.render('dashboard');
};

exports.signin = (req, res) => {
	console.log("we're in the signIN authcontroller")
  res.render('index');
};

// exports.signin = (req, res) => {
// 	console.log("we're in the authcontroller")
//   res.render('index');
// };


exports.dashboard = (req, res) => {
	console.log("we're in the dashboard authcontroller");
	var junk = "string";
	algorithms.getBeerOfTheDay(res, function(beerOTD){
			console.log(beerOTD);
			res.render('dashboard', beerOTD);
	});
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/');
  });
};

exports.listAll = function(req, res){
	console.log("we're in the / post");
    algorithms.listAll(res, function(dbBeer){
    	console.log(dbBeer)
        // res.render('dashboard', dbBeer);
          // res.json(dbBeer);
  });
}

exports.findNew = function(req, res){
	console.log("the start of find new");
	algorithms.matchBeer(res, req.body.matchName);
	console.log("In the find new");

}