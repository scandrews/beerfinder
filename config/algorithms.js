const mysql = require('mysql2');

var connection;
if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
  } else {
    connection = mysql.createConnection({
      host: 'p1us8ottbqwio8hv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
      port: 3306,
      // your username
      user: 'nqpjf6vsckll0kyv',
      // your password
      password: 'g5s2i226w3k0bkx0',
      database: 'znmhv3nf1xa52lhj'
    });
  };

// const connection = mysql.createConnection({
//   host: 'localhost',
//   port: 3306,
//   // your username
//   user: 'scandrews',
//   // your password
//   password: 'RutBud17',
//   database: 'beer_db',

// });
connection.connect((err) => {
  if (err) throw err;

  // find a random beer of the day
  exports.getBeerOfTheDay = function (res) {
    const beerOfTheDayID = Math.floor((Math.random() * 20)) + 1;
    console.log(beerOfTheDayID);
    // find = connection.query('SELECT * FROM beerTbl WHERE ?', [{id:beerOfTheDayID}], 
    connection.query('SELECT * FROM beerTbl WHERE ?', [{ id: beerOfTheDayID }],
      (err, result) => {
        if (err) throw err;
        console.log(`The Beer of the Day is: ${result[0].name}`);
        const beerOTD = result[0].name;
        const title = "The beer of the day is - ";

        res.render('dashboard', {title: "The beer of the day is - ", beers: beerOTD} );

        // return result[0].name;
      });
  };


  // list all the beer names
  exports.listAll = function (res) {
    connection.query('SELECT * FROM beerTbl', (err, result) => {
      if (err) throw err;
      for (let i = result.length - 1; i >= 0; i--) {
        console.log(`${result[i].name}\n`);
      }
      res.render('dashboard', { dbBeer: result });
      // return result;
    });
  };

  // list the beers out by type
  const listByType = function () {
    const styleSearch = 'IPA';
    const beerList = connection.query('SELECT * FROM beerTbl WHERE ?', [{ style: styleSearch }], (err, result) => {
      if (err) throw err;
      for (let i = 0; i < result.length; i++) {
        console.log(`${result[i].name}_____${result[i].style}`);
      }
    });//  --not in use currently
  };

  // search the db by name
  const searchDB = function () {
    const prompt = 'Heady Topper';		 // this will store the users inputed search
    const findMeBeers = function () { // this is a general search function for the db - search by name
      const beerList = connection.query('SELECT * FROM beerTbl WHERE ?', [{ name: prompt }],
			  (err, result) => {
          if (err) throw err;
          console.log(`prompt:  ${prompt}`);
          if (result.length == 0) {
            console.log('nothing found');
          } else {
            for (let i = 0; i < result.length; i++) {
              console.log(result[i].name);
            }
          }
        });
    };
    findMeBeers();
  }; // not used in current implementation


  exports.matchBeer = function (res, searchName) {
      console.log("in algorithms, matching beer - " + searchName);
      // pull beer 1 from db and store in var
      connection.query('SELECT * FROM beerTbl WHERE ?', [{ name: searchName }],	(err, result) => {
        if (result.length === 0){
            console.log("that wasn't in the database");
            const beersNotHere = searchName;
            console.log(beersNotHere);
            res.render('dashboard', {title: "Sorry ", beers: searchName, title2: "is not in our database"} );

            // res.render('dashboardnobeer', { notHere: searchName });

        }else{
          for (let i = 0; i < result.length; i++) {
              console.log(`matching beers to: ${result[0].name}`);
              // grabbing selected beer identifiers to match with
              var searchIbu = result[0].hoppieness;
              var searchColor = result[0].color;
              const searchStyle = result[0].style;
              // var smell = result[0].smell; //we need a much larger db for this to work - removed for now
              };

          ibuLimitHigh = searchIbu + 25;
          ibuLimitLow = searchIbu - 25;
          colorLimitHigh = searchColor + 2;
          colorLimitLow = searchColor - 2;

          // based on stats from beer 1 identify matching beers  searchIbu -25,'AND', searchIbu + 25,
          connection.query(`SELECT * FROM beerTbl WHERE hoppieness BETWEEN ${ibuLimitLow} AND ${ibuLimitHigh} AND ${colorLimitLow} AND ${colorLimitHigh}`,
            (err, result) => {
                if (err) throw err;
                for (let i = 0; i < result.length; i++) {
                  console.log(`your beer matches with: ${result[i].name}`);
                }
                // res.json(result);

                res.render('dashboard', {searchtitle: "Your beer matches with the following", beermatch: result} );

                // res.render('dashboard', { modalBeer: result });
                // return result;
            });
        }
      });
  };

  // add new beer to the database
  exports.addNewBeer = function (req, res) {
    console.log("In add beer, req.body -");
    console.log(req.body);
    // var query = JSON.stringify(req.body);
    var query = (req.body.name + "," + req.body.color + "," + req.body.hoppieness + "," + req.body.style + "," + req.body.smell + "," + req.body.feel + "," + false);
    console.log(query);
    connection.query('INSERT INTO beerTbl (name, color, hoppieness, style, smell, feel, triedthis) VALUES ?' [query], function(err, result) {
      if (err) throw err;
      console.log("result - " + result);
      for (let i = result.length - 1; i >= 0; i--) {
        console.log(`${result[i].name}\n`);
      }
      res.render('dashboard', { dbBeer: result });
      // return result;
    });
  };



});// end of connection
