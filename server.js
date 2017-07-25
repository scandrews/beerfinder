const express = require('express');

const app = express();
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const env = require('dotenv').load();
const exphbs = require('express-handlebars');
const PORT = 3004;
var path = require('path');

// for BodyParser
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

// for Passport
app.use(
  session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  })
);

// session secret
app.use(passport.initialize());
app.use(passport.session());

// for Handlebars
app.set('views', './views');
app.engine( 'handlebars', (exphbs({
    defaultLayout: 'main'
  }))
);
app.set('view engine', 'handlebars');

// app.get('/', (req, res) => {
// 	// signin();
//   res.send('Welcome to Passport with Sequelize');
// });

// Models
const models = require('./models');

// Routes
const authRoute = require('./controllers/auth.js')(app, passport);



// load passport strategies
require('./config/passport.js')(passport, models.user);



// for loading CSS
app.get('/style', function(req, res){
 console.log('got the css request');
 res.sendFile(path.join(__dirname, './public/assets/css/style.css'));
});

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