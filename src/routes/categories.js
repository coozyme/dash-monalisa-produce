var express = require('express');
var router = express.Router();
const { GetIssues, CreateIssue } = require('../controller/categories.js')

router.get('/issues', GetIssues);
router.post('/issues', CreateIssue);

module.exports = router;
