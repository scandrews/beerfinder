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

var findMeBeers = function(){
	var beerList = connection.query('SELECT * FROM beerTbl WHERE ?', function(err, result){
		if (err) throw err;
				
	})
}



//listAll();
// listByType();
}); //end of connection