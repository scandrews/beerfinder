var mysql = require('mysql2');

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	//your username
	user: "scandrews",
	//your password
	password:"RutBud17",
	database: "beer_db"

});
connection.connect(function start(err){
	if (err)  throw err;


//find a random beer of the day
exports.getBeerOfTheDay = function(res){
	var beerOfTheDayID = Math.floor((Math.random() * 20) + 1);
	console.log(beerOfTheDayID);
		// find = connection.query('SELECT * FROM beerTbl WHERE ?', [{id:beerOfTheDayID}], 
		connection.query('SELECT * FROM beerTbl WHERE ?', [{id:beerOfTheDayID}], 
			function(err, result){
				if (err) throw err;
				console.log("The Beer of the Day is: " + result[0].name);
				var beerOTD = result[0].name;
				res.render('dashboard', { beers: beerOTD });

				// return result[0].name;
			});
};


//basic test to log all the beer names
exports.listAll = function(res){
	connection.query('SELECT * FROM beerTbl', function(err, result){
		if (err) throw err;
		for (var i = result.length - 1; i >= 0; i--) {
			console.log(result[i].name + '\n');
		};
		res.render('dashboard', { dbBeer: result });
		// return result;
	});//test works 7-19 TG
};

//list the beers out by type
var listByType = function(){
	var styleSearch = "IPA";
	var beerList = connection.query('SELECT * FROM beerTbl WHERE ?', [{style: styleSearch}], function(err, result){
		if (err) throw err; 
			for (var i = 0; i < result.length; i++) {	
				console.log(result[i].name + '_____' + result[i].style);

			}
	});//test works 7-19 TG
};

//search the db by name
var searchDB = function(){
	var prompt = "Heady Topper";		 //this will store the users inputed search
		var findMeBeers = function(){ //this is a general search function for the db - search by name
			var beerList = connection.query('SELECT * FROM beerTbl WHERE ?', [{name:prompt}],
			  function(err, result){
				if (err) throw err;	
				console.log("prompt:  " + prompt);
					if (result.length == 0) {
						console.log("nothing found");
					}else{
							for (var i = 0; i < result.length; i++) {
								console.log(result[i].name);
							}
						}
			});
		}
	findMeBeers();
};
//match a chosen beer to similar beers in the db - STILL IN PROGRESS
// var matchBeer = function(){
// 	var chosenBeerId = req.param.id;
// 	//pull beer 1 from db and store in var
// 	var selectedBeer = connection.query('SELECT * FROM beerTbl WHERE ?', [{id:chosenBeerId}],
//  	function(err, result){
// 		if (err) throw err; 
// 		for (var i = 0; i < result.length; i++) {
// 			console.log("matching beers to: " + result[0].name);
// 			//grabbing selected beer identifiers to match with
// 			var searchIbu = result[0].hoppieness;
// 			var searchColor = result[0].color;
// 			var searchStyle = result[0].style;
// 			// var smell = result[0].smell; //we need a much larger db for this to work - removed for now
// 		}
// // SELECT * FROM MyTable WHERE (Column1 LIKE '%keyword1%' OR Column2 LIKE 
// // '%keyword1%') AND (Column1 LIKE '%keyword2%' OR Column2 LIKE '%keyword2%');

// ibuLimitHigh = searchIbu + 25;
// ibuLimitLow = searchIbu - 25;
// colorLimitHigh = searchColor + 2;
// colorLimitLow = searchColor - 2;

// 			//based on stats from beer 1 identify matching beers	 searchIbu -25,'AND', searchIbu + 25,
// 	var matchedBeers = connection.query('SELECT * FROM beerTbl WHERE hoppieness BETWEEN ' + ibuLimitLow + ' AND ' + ibuLimitHigh + ' AND ' + colorLimitLow + ' AND ' + colorLimitHigh,  
// 		function(err, result){
// 			if(err) throw err;
// 			for (var i = 0; i < result.length; i++) {
// 				console.log("your beer matches with: " + result[i].name);
// 			}
// 		});	
// 	});	
// }



//my sql .escape makes usre the variable you're using is ok to use with SQL
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

});//end of connection
