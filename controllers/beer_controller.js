
var express = require("express");
// include the data definition from schema.js
var db = require("./models");
var path = require("path");

var router = express.Router();


// routes for functionality


// route for listing all beers
router.put("/showBeers", function(req, res) {
	console.log("We're in show beers");


	db.beerTbl.listAll({}).then(function(dbBeer) {
		res.render("index");
	      	res.json(dbBeer);
	});

});


// this route creates new beers
router.put("/", function(req, res) {
	console.log("we're in the beer put route ");

	db.beerTbl.create({
			name: req.body.name,
			id: currentUserId
		}).then(function(dbBurger) {
			console.log(customerId);
			db.beerTbl.findAll({  }).then(function(dbbeer) {
			;
	      		// res.json(dbBeer);
			});	
	});
});



	db.customer.create(req.body).then(function(dbBeer) {
		db.user.findAll({
			where: {
				user_name: req.body.cust_name
			} }).then(function(currentUser){
				console.log(currentUser);
				console.log("----------------");
				console.log(currentUser.id);
				currentUserId = currentUser.id;
			})
		.then(function(dbBeer) {
		// need to return data here
		res.redirect("/");
		res.render("index");
      		// res.json(dbBeer);
		});
	});
});



router.post("/", function(req, res) {
	console.log("we're in the / post");
	// query = "UPDATE burgers SET devoured = 1 WHERE id = " + [req.body.id];
	db.burger.update({
			devoured: true,
			},
			{
			where: {
				id: req.body.id
			}
		})
		.then(function(dbBurger){
			db.burger.findAll({  }).then(function(dbBurger) {
				res.render("index", { burgers: dbBurger });
      			// res.json(dbBurger);
			});			// res.json(dbBurger);

        	// res.redirect("/showBurgers");
      	});
});


router.delete("/", function(req, res) {
	console.log("we're in the delete");
	db.burger.destroy({
		where: {
			id: req.body.id
		}
	}).then(function(dbBurger){
			db.burger.findAll({  }).then(function(dbBurger) {
				res.render("index", { burgers: dbBurger });
      			// res.json(dbBurger);
			});			// res.json(dbBurger);
		// res.redirect("/showBurgers")
	});
});

//------------------------
// route for the style sheet
// router.get("/style", function(req, res){
// 	res.sendFile(path.join(__dirname, "../public/assets/css/style.css"));
// });

// // route for the image
// router.get("/url", function(req, res){
// 	console.log("we got the image request");
// 	res.sendFile(path.join(__dirname, "../public/assets/images/burger.png"));
// });


module.exports = router;