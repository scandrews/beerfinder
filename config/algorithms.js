const mysql = require('mysql2');
// include the data definition from schema.js
var db = require("../models");
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

// var connection;
// if (process.env.JAWSDB_URL) {
//   connection = mysql.createConnection(process.env.JAWSDB_URL);
//   } else {
//     connection = mysql.createConnection({
//       host: 'localhost',
//       port: 3306,
//       // your username
//       user: 'scandrews',
//       // your password
//       password: 'RutBud17',
//       database: 'beer_db'  
//     });
//   };


  // find a random beer of the day
  exports.getBeerOfTheDay = function (req, res) {
    db.beertbl.findAll({ }).then(function(result) {
        console.log("in get beer of the day, results.name - ");
        // get the number of beers in the db to use for search
        var maxNumBeers = result.length;
        console.log(maxNumBeers);
        var beerOfTheDayID = Math.floor((Math.random() * maxNumBeers)) + 1;
        console.log(beerOfTheDayID);
        // find = connection.query('SELECT * FROM beerTbl WHERE ?', [{id:beerOfTheDayID}], 
        db.beertbl.findOne({
          where: {
            id: beerOfTheDayID
            }
            }).then(function(beerOTD){
              console.log("The Beer of the Day is: ");
              console.log(beerOTD.name);
              const title = "The beer of the day is - ";

              res.render('dashboard', {title: "The beer of the day is - ", beers: beerOTD.name} );

              // return result[0].name;
          })
    });
  };


  // list all the beer names
  exports.listAll = function (req, res) {
    db.beertbl.findAll({ }).then(function(result) {
      res.render('dashboard', { title: "These are the beers in our database", dbBeer: result });
    });
  };

  // list the beers out by type
  // const listByType = function () {
  //   const styleSearch = 'IPA';
  //   const beerList = db.beertbl('SELECT * FROM beerTbl WHERE ?', [{ style: styleSearch }], (err, result) => {
  //     if (err) throw err;
  //     for (let i = 0; i < result.length; i++) {
  //       console.log(`${result[i].name}_____${result[i].style}`);
  //     }
  //   });//  --not in use currently
  // };

  // search the db by name
  // const searchDB = function () {
  //   const prompt = 'Heady Topper';		 // this will store the users inputed search
  //   const findMeBeers = function () { // this is a general search function for the db - search by name
  //     const beerList = connection.query('SELECT * FROM beerTbl WHERE ?', [{ name: prompt }],
		// 	  (err, result) => {
  //         if (err) throw err;
  //         console.log(`prompt:  ${prompt}`);
  //         if (result.length == 0) {
  //           console.log('nothing found');
  //         } else {
  //           for (let i = 0; i < result.length; i++) {
  //             console.log(result[i].name);
  //           }
  //         }
  //       });
  //   };
  //   findMeBeers();
  // }; // not used in current implementation


  exports.matchBeer = function (req, res) {
      var searchName = req.body.matchName
      console.log("in algorithms, matching beer - " + searchName);
      // pull beer 1 from db and store in var
      db.beertbl.findOne({
          where: {
            name: searchName
          }
        }).then( function(result) {
          if (result === null){
            console.log("In Algorthms: matchbeer - that wasn't in the database");
            console.log(searchName);
            res.render('dashboard', {title: "Sorry ", beers: searchName, title2: "is not in our database"});
          }else{
            console.log("back from initial match - id, hoppieness, color - ");
            console.log(result.id);
            console.log(result.hoppieness)
            console.log(result.color);
            console.log(`matching beers to: ${result.name}`);
            console.log(result.name);
            // grabbing selected beer identifiers to match with
            var searchIbu = result.hoppieness;
            var searchColor = result.color;
                // const searchStyle = result.style;
                // var smell = result[0].smell; //we need a much larger db for this to work - removed for now
                // };

            ibuLimitHigh = searchIbu + 20;
            ibuLimitLow = searchIbu - 20;
            colorLimitHigh = searchColor + 2;
            colorLimitLow = searchColor - 2;

            // based on stats from beer 1 identify matching beers searchIbu +-25,'AND', searchColor +- 2

            db.beertbl.findAll({
              where: {
                hoppieness:
                  {[Op.between]: [ibuLimitLow, ibuLimitHigh]},
                color:
                  {[Op.between]: [colorLimitLow, colorLimitHigh]}
              }
            }).then( function(result){
              for (let i = 0; i < result.length; i++) {
                console.log(`your beer matches with: ${result[i].name}`);
                }
              res.render('dashboard', {searchtitle: "Your beer matches with the following", beermatch: result} );
              });
        }
      });
  };

  // add new beer to the database
  exports.addNewBeer = function (req, res) {
    console.log("In add beer, req.body -");
    console.log(req.body);
    db.beertbl.create(
      {
        name: req.body.name,
        color: req.body.color,
        hoppieness: req.body.hoppieness,
        style: req.body.style,
        smell: req.body.smell,
        feel: req.body.feel,
        triedThis: false,
        createdAt: db.DATE,
        updatedAt: db.DATE
      }).then(function(result){
        console.log("in the create callback");
        // if (err){
        //   console.log("error in the db write");
        //   console.log(err);
        // }
        // else{
          console.log("sucessfully wrote new beer to db");
          console.log("result - ");
          console.log(result.name);
        // }
        res.render('dashboard', {title: "Your beer - ", beers: result.name, title2: "has been added to the database"} );

    });
  // end add new beer
  };



// end of connection
