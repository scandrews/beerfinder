// The server file for Project 2 - the beer finder app
'use strict';
// Node Package Dependencies
var bodyParser = require("body-parser");
var path = require("path");
var methodOverride = require("method-override");
var express = require("express");


// const express = require('express');

// Set up Express
// var app = express();
const app = express();
//>>>>>>> 679f1a4fad83a09e72e3d4384c2517cd57672dc3
const passport = require('passport');
const session = require('express-session');
const env = require('dotenv').load();
const exphbs = require('express-handlebars');

// for BodyParser
// app.use(bodyParser.urlencoded({ extended: true, }),);
// app.use(bodyParser.json());

// Set up application dependencies
var routes = require("./controllers/beer_controller.js");

// For BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use("/", routes);



// for Passport
app.use(
  session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  })
); // session secret

app.use(passport.initialize());
app.use(passport.session());

// for Handlebars
app.set('views', './app/views');
app.engine(
  'hbs',
  exphbs({
    extname: '.hbs',
  })
);
app.set('view engine', '.hbs');

//=======
// Models
// const models = require('./app/models');
// Models  -  from John's passport
const models = require('./models');
// Requiring our models for syncing - from my stuff
var db = require("./models");

  


// set up the port
var PORT = process.env.PORT || 3000;

// set up method override
app.use(methodOverride("_method"));


// route for static data/pages
// app.use(express.static("./public"));



// For Passport // session secret
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
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


// Routes
const authRoute = require('./app/routes/auth.js')(app, passport);

// load passport strategies
require('./app/config/passport/passport.js')(passport, models.user);

// Sync Database
models.sequelize
  .sync()
  .then(() => {
    console.log('Nice! Database looks fine');
  })
  .catch((err) => {
    console.log(err, 'Something went wrong with the Database Update!');
  });

// app.listen(3306, (err) => {
//   if (!err) {
//     console.log('Site is live');
//   } else console.log(err);
//>>>>>>> 679f1a4fad83a09e72e3d4384c2517cd57672dc3
//------------------

// This was from John's Passport server file
// Sync Database
// models.sequelize.sync().then(() => {
// Syncing sequelize and start application
db.sequelize.sync({ force: true }).then(function() {
	app.listen(PORT, function() {
		console.log("App listening on PORT " + PORT);
	});
});
