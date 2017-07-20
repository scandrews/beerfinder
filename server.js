// The server file for week 15 homework - the burger app using sequelize for database access

// Node Package Dependencies
var bodyParser = require("body-parser");
var path = require("path");
var methodOverride = require("method-override");
var express = require("express");

// Set up application dependencies
var routes = require("./controllers/burgers_controller.js");

// Set up Express
var app = express();
// set up the port
var PORT = process.env.PORT || 3000;

// set up method override
app.use(methodOverride("_method"));

// set up handlebars
var exphbs = require("express-handlebars");
// set up the handlebars engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// route for static data/pages
// app.use(express.static("./public"));


// Set up Express for data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use("/", routes);

// Static directory
// app.use(express.static("./public"));

//------------------------
// route for the style sheet
app.get("/style", function(req, res){
	res.sendFile(path.join(__dirname, "./public/css/style.css"));
});

// route for the image
app.get("/url", function(req, res){
	console.log("we got the image request");
	res.sendFile(path.join(__dirname, "./public/images/burger.png"));
});


//------------------

// Requiring our models for syncing
var db = require("./models");

// Syncing sequelize and start application
db.sequelize.sync({ force: true }).then(function() {
	app.listen(PORT, function() {
		console.log("App listening on PORT " + PORT);
	});
});
