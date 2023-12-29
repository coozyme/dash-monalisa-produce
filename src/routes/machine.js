var express = require('express');
var router = express.Router();
const { Add } = require('../controller/machine.js')

// const { isLoginAdmin } = require('../middleware/auth')

// router.use(isLoginAdmin)
router.post('/add-machine', Add);
// router.get('/auth', function(req, res){res.redirect('/auth/login')});

module.exports = router;
