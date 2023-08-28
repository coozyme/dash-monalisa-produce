var express = require('express');
var router = express.Router();
const { index } = require('../controller/dashboard.js')

// const { isLoginAdmin } = require('../middleware/auth')

// router.use(isLoginAdmin)
router.get('/', index);
router.get('/auth', function(req, res){res.redirect('/auth/login')});

module.exports = router;
