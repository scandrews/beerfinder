// the server for the beer finder app
const express = require('express');

const app = express();
const session = require('express-session');
const nodemon = require('nodemon');
const passport = require('passport');
const bodyParser = require('body-parser');

// const env = require('dotenv').load();
const exphbs = require('express-handlebars');
const path = require('path');

const PORT = 4000;

// for including CSS
// app.use(express.static('public'));

// for BodyParser
app.use(
  bodyParser.urlencoded({
    extended: true
  }),
);

app.use(bodyParser.json());

// for Passport
app.use(
  session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  }),
);

// session secret
app.use(passport.initialize());
app.use(passport.session());

// for Handlebars
app.set('views', './views');

app.engine('handlebars', (exphbs({
  helpers: { code() { return 'WTF'; } },
  defaultLayout: 'main'
})),
);

app.set('view engine', 'handlebars');

// Serve static content from the 'public' directory
app.use(express.static('public'));


// Models
const models = require('./models');

// Routes
const authRoute = require('./controllers/auth.js')(app, passport);
const routes = require('./controllers/beer_controller.js');


// load passport strategies
require('./config/passport.js')(passport, models.user);

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
