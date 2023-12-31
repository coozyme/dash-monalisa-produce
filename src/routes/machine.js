var express = require('express');
var router = express.Router();
const { Add, Get, GetByID, UpdateByID, DeleteByID } = require('../controller/machine.js')

// const { isLoginAdmin } = require('../middleware/auth')

// router.use(isLoginAdmin)
router.post('/add-machine', Add);
router.get('/', Get);
router.get('/:id', GetByID);
router.put('/:id', UpdateByID);
router.delete('/:id', DeleteByID);
// router.get('/auth', function(req, res){res.redirect('/auth/login')});

module.exports = router;
