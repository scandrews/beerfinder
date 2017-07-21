var mysql = require('mysql');

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	//your username
	user: "root",
	//your password
	password:"",
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
	var beerList = connection.query('SELECT * FROM beerTbl WHERE style= "IPA"', function(err, result){
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
			console.log("matching beers to:" + result[0].RowDataPacket.name);
		}
	});

	//based on stats from beer 1 identify matching beers
}



// matchBeer();
searchDB();
//listAll();
// listByType();
}); //end of connection