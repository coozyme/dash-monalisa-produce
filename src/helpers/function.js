function authLogin() {
   return function (req, res, next) {
      // if (req.session.user) {
      //    next();
      // } else {
      // }
      // res.redirect('/auth/login');
      alert('Please login to continue');
   }
}

module.exports = { authLogin };