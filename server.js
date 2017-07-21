// FORGOT WHAT GOES HERE...IMPORTS? IDK
const express = require('express');

const app = express();
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const env = require('dotenv').load();
const exphbs = require('express-handlebars');

// Routes
const authRoute = require('./app/routes/auth.js')(app);

app.get('/', (req, res) => {
  res.send('Welcome to Passport with Sequelize');
});

app.get('/signup', (req, res) => {    //  signup
  res.send('Signup route!');
});

app.listen(5002, (err) => {
  if (!err) {
    console.log('it lives!');
  } else console.log(err);
});

// For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For Passport
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Models
const models = require('./app/models');

// Sync Database
models.sequelize.sync().then(() => {
  console.log('Nice! Database looks fine');
}).catch((err) => {
  console.log(err, 'Something went wrong with the Database Update!');
});

// For Handlebars
app.set('views', '/app/views');
app.engine('hbs', exphbs({
  extname: '.hbs',
}));
app.set('view engine', '.hbs');
