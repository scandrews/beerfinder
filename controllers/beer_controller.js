
const express = require('express');
// include the data definition from schema.js
const db = require('../models');
const path = require('path');

const router = express.Router();

const algorithms = require('../config/algorithms.js');


// route for listing all beers
// router.get('/showBeers', (req, res) => {
//     console.log("We're in show beers");

//     algorithms.listAll({ }).then((dbBeer) => {
//       res.render('dashboard', dbBeer);
//       		// res.json(dbBeer);
//     });
//   });

router.post('/listAll', (req, res) => {
  console.log("we're in the / post");
  algorithms.listAll({ }).then((dbBeer) => {
    res.render('dashboard', dbBeer);
    // res.json(dbBeer);


    // .then(function(dbBurger){
    //   db.burger.findAll({  }).then(function(dbBurger) {
    //     res.render("index", { burgers: dbBurger });
    //         // res.json(dbBurger);
    //   });     // res.json(dbBurger);

    //       // res.redirect("/showBurgers");
    //     });
  });
});


// router.get('/', (req, res) => {
//   console.log('got the initial passport request in the controller');
//   res.sendFile(path.join(__dirname, '../login.html'));
// });

// res.send('Welcome to Passport with Sequelize');

// the original get from passport
// app.get('/', (req, res) => {
//  console.log("got the initial request in the server");
//  res.sendFile(path.join(__dirname, "./login.html"));

//   res.send('Welcome to Passport with Sequelize');
// });


// routes for functionality
// route for the initial startup/login screen
// router.get('/login', (req, res) => {
//   console.log("We're in the user login");
//   res.sendFile(path.join(__dirname, '../index.html'));

//   // res.render("login")
// });

// // This route logs in customer
// router.post('/user', (req, res) => {
//   console.log("we're in the user post");
//   console.log(req.body.cust_name);

// check the db for that user
// if not in db - create

// if user is aready in db
//    return isting of beers


// this route creates new beers
router.put('/', (req, res) => {
  console.log("we're in the beer put");


  db.beerTbl.create({
    name: req.body.name,
    id: currentUserId,
  }).then((dbBeer) => {
    console.log(customerId);
    db.beerTbl.findAll({ }).then((dbBeer) => {

	      		// res.json(dbBeer);
    });
  });
});


// db.customer.create(req.body).then((dbBeer) => {
//   db.user.findAll({
//     where: {
//       user_name: req.body.cust_name,
//     } }).then((currentUser) => {
//     console.log(currentUser);
//     console.log('----------------');
//     console.log(currentUser.id);
//     currentUserId = currentUser.id;
//   })
//     .then((dbBeer) => {
//       // need to return data here
//       res.redirect('/');
//       res.render('index');
//     		// res.json(dbBeer);
//     });
// });


router.post('/', (req, res) => {
  console.log("we're in the / post");
  // query = "UPDATE burgers SET devoured = 1 WHERE id = " + [req.body.id];
  db.burger.update({
    devoured: true,
  },
  {
    where: {
      id: req.body.id,
    },
  })
    .then((dbBurger) => {
      db.burger.findAll({ }).then((dbBurger) => {
        res.render('index', { burgers: dbBurger });
      			// res.json(dbBurger);
      });			// res.json(dbBurger);

        	// res.redirect("/showBurgers");
      	});
});


router.delete('/', (req, res) => {
  console.log("we're in the delete");
  db.burger.destroy({
    where: {
      id: req.body.id,
    },
  }).then((dbBurger) => {
    db.burger.findAll({ }).then((dbBurger) => {
      res.render('index', { burgers: dbBurger });
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
