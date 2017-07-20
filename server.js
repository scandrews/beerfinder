// The server file for Project 2 - the beer finder app
'use strict';

const passport = require('passport');
const session = require('express-session');
const env = require('dotenv').load();


// Models  -  from John's passport
const models = require('./models');
// Requiring our models for syncing - from my stuff
var db = require("./models");

  
// Node Package Dependencies
var bodyParser = require("body-parser");
var path = require("path");
var methodOverride = require("method-override");
var express = require("express");

// Set up application dependencies
var routes = require("./controllers/beer_controller.js");

// Set up Express
var app = express();
// set up the port
var PORT = process.env.PORT || 3000;

// set up method override
app.use(methodOverride("_method"));


// route for static data/pages
// app.use(express.static("./public"));

// For BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use("/", routes);


// For Passport
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

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

app.get('/', (req, res) => {
	console.log("got the initial request in the server");
	res.sendFile(path.join(__dirname, "./login.html"));

  res.send('Welcome to Passport with Sequelize');
});

//------------------

// This was from John's Passport server file
// Sync Database
// models.sequelize.sync().then(() => {
// Syncing sequelize and start application
db.sequelize.sync({ force: true }).then(function() {
	app.listen(PORT, function() {
		console.log("App listening on PORT " + PORT);
	})
});
