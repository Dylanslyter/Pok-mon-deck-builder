// copied code from mini project
const withAuth = (req, res, next) => {
    if (!req.session.loggedIn) {
      res.redirect('/');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;