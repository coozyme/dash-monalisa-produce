var express = require('express');
var router = express.Router();
const { role, addRole } = require('../controller/management-user.js')
const { addMenu } = require('../controller/menu.js')

// const { isLoginAdmin } = require('../middleware/auth')

// router.use(isLoginAdmin)
router.get('/role', role);
router.post('/add-role', addRole)
router.get('/permission', addRole)
router.post('/add-menu', addMenu)
// router.get('/auth', function(req, res){res.redirect('/auth/login')});

module.exports = router;
