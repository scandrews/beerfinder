var mysql = require('mysql');

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	//your username
	user: "root",
	//your password
	password:"advictoriam",
	database: "beer_db"

});
connection.connect(function start(err){
	if (err)  throw err;


//basic test to log all the beer names
var listAll = function(){
	var beerList = connection.query('SELECT * FROM beerTbl', function(err, result){
		if (err) throw err;
			for (var i = result.length - 1; i >= 0; i--) {
				console.log(result[i].name + '\n');
		}
	});//test works 7-19 TG
}
var listByType = function(){
	var styleSearch = "IPA";
	var beerList = connection.query('SELECT * FROM beerTbl WHERE ?', [{style: styleSearch}], function(err, result){
		if (err) throw err; 
			for (var i = 0; i < result.length; i++) {	
				console.log(result[i].name + '_____' + result[i].style);

			}
	});//test works 7-19 TG
}

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
}

var matchBeer = function(){
	var chosenBeerId = 3;
	//pull beer 1 from db and store in var
	var selectedBeer = connection.query('SELECT * FROM beerTbl WHERE ?', [{id:chosenBeerId}],
 	function(err, result){
		if (err) throw err; 
		for (var i = 0; i < result.length; i++) {
			console.log("matching beers to: " + result[0].name);
			//grabbing selected beer identifiers to match with
			var searchIbu = result[0].hoppieness;
			var searchColor = result[0].color;
			var searchStyle = result[0].style;
			// var smell = result[0].smell; //we need a much larger db for this to work - removed for now
		}
// SELECT * FROM MyTable WHERE (Column1 LIKE '%keyword1%' OR Column2 LIKE 
// '%keyword1%') AND (Column1 LIKE '%keyword2%' OR Column2 LIKE '%keyword2%');


			//based on stats from beer 1 identify matching beers	
			var matchedBeers = connection.query('SELECT * FROM beerTbl WHERE (hoppieness LIKE searchIbu) AND (color LIKE searchColor) AND (style LIKE searchStyle)', 
				function(err, result){
				if(err) throw err;
				for (var i = 0; i < result.length; i++) {
					console.log("your beer matches with: " + result[i].name);
				}
				});	
	});	
}


//find a random beer of the day
var beerOfTheDay = function(){
	var beerOfTheDayID = Math.floor((Math.random() * 20) + 1);
	console.log(beerOfTheDayID);
		find = connection.query('SELECT * FROM beerTbl WHERE ?', [{id:beerOfTheDayID}], 
			function(err, result){
				if (err) throw err;
				console.log("The Beer of the Day is: " + result[0].name);
			});
}






// beerOfTheDay(); 	//	7/22 working TG
// matchBeer();		//	7/22 IN PROGRESS TG
// searchDB();		//	7-22 working TG
// listAll();		//	7-22 working TG
// listByType();	// 	7-22 working TG

});//end of connection


