var express = require('express');
var router = express.Router();
const { Add, Get, Update } = require('../controller/employee.js')

router.get('/', Get);
router.post('/add-employee', Add);
router.put('/update-employee/:id', Update);

module.exports = router;
