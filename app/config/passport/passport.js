// load bCrypt
const bCrypt = require('bcrypt-nodejs');


module.exports = (passport, user) => {
  const User = user;

  const LocalStrategy = require('passport-local').Strategy;


  passport.use('local-signup', new LocalStrategy(

    {

      usernameField: 'email',

      passwordField: 'password',

      passReqToCallback: true, // allows us to pass back the entire request to the callback

    },


    ((req, email, password, done) => {
      const generateHash = function (password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
      };


      User.findOne({
        where: {
          email,
        },
      }).then((user) => {
        if (user) {
          return done(null, false, {
            message: 'That email is already taken',
          });
        }

        const userPassword = generateHash(password);

        const data =

          {
            email,

            password: userPassword,

            firstname: req.body.firstname,

            lastname: req.body.lastname,

          };

        User.create(data).then((newUser, created) => {
          if (!newUser) {
            return done(null, false);
          }

          if (newUser) {
            return done(null, newUser);
          }
        });
      });
    }),

    //  serialize
    passport.serializeUser((user, done) => {
      done(null, user.id);
    }),
    // deserialize user
    passport.deserializeUser((id, done) => {
      User.findById(id).then((user) => {
        if (user) {
          done(null, user.get());
        } else {
          done(user.errors, null);
        }
      });
    }),
  ));
};
