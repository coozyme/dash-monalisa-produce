var express = require('express');
var router = express.Router();
const { login, forgotPassword } = require('../controller/auth.js')

// const { isLoginAdmin } = require('../middleware/auth')

// router.use(isLoginAdmin)
router.get('/auth', function(req, res){ res.redirect('/auth/login')})
router.get('/login', login);
router.get('/forgot-password', forgotPassword);

module.exports = router;
