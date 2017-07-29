const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  // your username
  user: 'scandrews',
  // your password
  password: 'RutBud17',
  database: 'beer_db',

});
connection.connect((err) => {
  if (err) throw err;


  // find a random beer of the day
  exports.getBeerOfTheDay = function (res) {
    const beerOfTheDayID = Math.floor((Math.random() * 20) + 1);
    console.log(beerOfTheDayID);
    // find = connection.query('SELECT * FROM beerTbl WHERE ?', [{id:beerOfTheDayID}], 
    connection.query('SELECT * FROM beerTbl WHERE ?', [{ id: beerOfTheDayID }],
      (err, result) => {
        if (err) throw err;
        console.log(`The Beer of the Day is: ${result[0].name}`);
        const beerOTD = result[0].name;
        res.render('dashboard', { beers: beerOTD });

        // return result[0].name;
      }); // this is working without AJAX  7-27TG
  };


  // basic test to log all the beer names
  exports.listAll = function (res) {
    connection.query('SELECT * FROM beerTbl', (err, result) => {
      if (err) throw err;
      for (let i = result.length - 1; i >= 0; i--) {
        console.log(`${result[i].name}\n`);
      }
      res.render('dashboard', { dbBeer: result });
      // return result;
    });// working currently 7-27 TG
  };

  // list the beers out by type
  const listByType = function () {
    const styleSearch = 'IPA';
    const beerList = connection.query('SELECT * FROM beerTbl WHERE ?', [{ style: styleSearch }], (err, result) => {
      if (err) throw err;
      for (let i = 0; i < result.length; i++) {
        console.log(`${result[i].name}_____${result[i].style}`);
      }
    });// test works 7-19 TG --not in use currently 7/27 TG
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
  }; // also not used in current iteration 7/27 TG

  exports.matchBeer = function (res, searchName) {
    console.log(`in matching beer - ${searchName}`);
    // pull beer 1 from db and store in var
    connection.query('SELECT * FROM beerTbl WHERE ?', [{ name: searchName }],
 	(err, result) => {
        if (err) throw err;
        for (let i = 0; i < result.length; i++) {
          console.log(`matching beers to: ${result[0].name}`);
          // grabbing selected beer identifiers to match with
          var searchIbu = result[0].hoppieness;
          var searchColor = result[0].color;
          const searchStyle = result[0].style;
          // var smell = result[0].smell; //we need a much larger db for this to work - removed for now
        }

        ibuLimitHigh = searchIbu + 25;
        ibuLimitLow = searchIbu - 25;
        colorLimitHigh = searchColor + 2;
        colorLimitLow = searchColor - 2;

        // based on stats from beer 1 identify matching beers	 searchIbu -25,'AND', searchIbu + 25,
        connection.query(`SELECT * FROM beerTbl WHERE hoppieness BETWEEN ${ibuLimitLow} AND ${ibuLimitHigh} AND ${colorLimitLow} AND ${colorLimitHigh}`,
          (err, result) => {
            if (err) throw err;
            for (let i = 0; i < result.length; i++) {
              console.log(`your beer matches with: ${result[i].name}`);
            }
            // res.json(result);
            // res.render('dashboard', { modalBeer: result });
            return result;
          });
      });
  };

  // add new beer to the database
  exports.addNewBeer = function (req, res) {
    var query = stringify(req.body);
    console.log(query);
    connection.query('INSERT INTO beerTbl (name, color, hoppieness, style, smell, feel, triedthis) VALUES ?' [{query}] , (err, result) => {
      if (err) throw err;
      for (let i = result.length - 1; i >= 0; i--) {
        console.log(`${result[i].name}\n`);
      }
      res.render('dashboard', { dbBeer: result });
      // return result;
    });// working currently 7-27 TG
  };


// my sql .escape makes usre the variable you're using is ok to use with SQL
// beerOfTheDay(); 	//	7/22 working TG
// matchBeer();		//	7/22 IN PROGRESS TG
// searchDB();		//	7-22 working TG
// listAll();		//	7-22 working TG
// listByType();	// 	7-22 working TG


// var algorithms = {
// 	getBeerOfTheDay: getBeerOfTheDay,
// 	// matchBeer: matchBeer,
// 	listAll: listAll	
// };
// module.exports = algorithms;
});// end of connection
