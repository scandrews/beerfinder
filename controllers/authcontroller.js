var exports = module.exports = {};


exports.signup = (req, res) => {
	console.log("we're in the signUP authcontroller")
  res.render('dashboard');
};

exports.signin = (req, res) => {
	console.log("we're in the signIN authcontroller")
  res.render('index');
};


exports.dashboard = (req, res) => {
  res.render('dashboard');
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/');
  });
};
