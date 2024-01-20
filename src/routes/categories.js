var express = require('express');
var router = express.Router();
const { GetIssues, CreateIssue, UpdateIssue, DeleteIssue } = require('../controller/categories.js')

router.get('/issues', GetIssues);
router.post('/issues', CreateIssue);
router.put('/issues/:id', UpdateIssue);
router.delete('/issues/:id', DeleteIssue);

module.exports = router;
