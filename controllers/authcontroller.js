var exports = module.exports = {};


exports.signup = (req, res) => {
  res.render('signup');
};

exports.signin = (req, res) => {
	console.log("we're in the authcontroller")
  res.render('signin');
};


exports.dashboard = (req, res) => {
  res.render('dashboard');
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/');
  });
};
