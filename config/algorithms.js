const mysql = require('mysql2');

var connection;
if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
  } else {
    connection = mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'scandrews',
      password: 'RutBud17',
      database: 'beer_db'  
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
  exports.getBeerOfTheDay = function (req, res) {
    console.log("in get beer of the day");
    connection.query('SELECT * FROM beerTbl ORDER BY RAND() LIMIT 1;', (err, result) => {
      console.log(result);
      const beerOTD = result[0].name;
      res.render('dashboard', {title: "The beer of the day is - ", beers: beerOTD} );
    });
  };


  // list all the beer names
  exports.listAll = function (req, res) {
    connection.query('SELECT * FROM beerTbl', (err, result) => {
      if (err) throw err;
      for (let i = result.length - 1; i >= 0; i--) {
        console.log(`${result[i].name}`);
      }
      res.render('dashboard', { Label: "For details click on a beer", dbBeer: result });
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
    });
  };
  //  --not in use currently

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


  exports.matchBeer = function (req, res) {
      console.log("in algorithms, matching beer - " + req.body.matchName);
      // pull beer 1 from db and store in var
      connection.query('SELECT * FROM beerTbl WHERE ?', [{ name: req.body.matchName }],	(err, result) => {
        if (result.length === 0){
            console.log("that wasn't in the database");
            const beersNotHere = req.body.matchName;
            console.log(beersNotHere);
            res.render('dashboard', {title: "Sorry ", beers: req.body.matchName, title2: "is not in our database"} );

        }else{
          for (let i = 0; i < result.length; i++) {
              console.log(`matching beers to: ${result[0].name}`);
              // grabbing selected beer identifiers to match with
              var searchIbu = result[0].hoppieness;
              var searchColor = result[0].color;
              const searchStyle = result[0].style;
              // var smell = result[0].smell; //we need a much larger db for this to work - removed for now
              };

          ibuLimitHigh = searchIbu + 20;
          ibuLimitLow = searchIbu - 20;
          colorLimitHigh = searchColor + 2;
          colorLimitLow = searchColor - 2;

          // based on stats from beer 1 identify matching beers  searchIbu -25,'AND', searchIbu + 25,
          connection.query(`SELECT * FROM beerTbl WHERE hoppieness BETWEEN ${ibuLimitLow} AND ${ibuLimitHigh} AND ${colorLimitLow} AND ${colorLimitHigh}`,
            (err, result) => {
                if (err) throw err;
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
    console.log(req.query);
    connection.query("INSERT INTO beerTbl SET ?",
      {
        name: req.query.name,
        color: req.query.color,
        hoppieness: req.query.hoppieness,
        style: req.query.style,
        smell: req.query.smell,
        feel: req.query.feel,
        triedThis: false
      },
      (err, result) => {
        if (err) throw err;
        console.log("right before res render");
        var temp = req.query.name;
        console.log(temp);
        res.render('dashboard', {firstAddTitle: "Your Beer - ", matchedBeer: temp, secondAddTitle: "was addaed to our database" });
        }
    )
  }
  // end add new beer

  // delete a beer by id
  exports.deleteBeer = function (req, res){
    console.log("in algorithms delete beer");
    console.log(req.body);
    var beerToDeleteID = req.body.id;
    connection.query("DELETE FROM beerTbl WHERE ?", { id: beerToDeleteID },
      (err, result) => {
        if (err) throw err;
        res.render('dashboard', {title: "your beer was deleted"});
      });
  };



});// end of connection
