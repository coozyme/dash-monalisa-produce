var express = require('express');
var router = express.Router();
const { Login, Register, GeneratePassword, ChangePassword } = require('../controller/auth.js')

// const { isLoginAdmin } = require('../middleware/auth')

// router.use(isLoginAdmin)
// router.get('/auth', function (req, res) { res.redirect('/auth/login') })
router.post('/login', Login);
router.post('/regist', Register);
router.get('/generate-password', GeneratePassword);
router.post('/change-password', ChangePassword);

module.exports = router;
