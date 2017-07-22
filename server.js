// The server file for Project 2 - the beer finder app
'use strict';

const passport = require('passport');
const session = require('express-session');
const env = require('dotenv').load();

const exphbs = require('express-handlebars');
const PORT = 3000;
// for BodyParser
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);


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
models.sequelize
  .sync()
  .then(() => {
    console.log('Nice! Database looks fine');
  })
  .catch((err) => {
    console.log(err, 'Something went wrong with the Database Update!');
  });

app.listen(PORT, (err) => {
  if (!err) {
    console.log('Site is live listening on PORT', PORT);
  } else console.log(err);

});
