var express = require('express');
var router = express.Router();
const { GetDataUser } = require('../controller/user.js');
const { AuthenticateToken } = require('../middleware/auth.js');

// router.use(authenticateToken);
router.get('/', AuthenticateToken, GetDataUser);
// router.post('/add-employee', Add);
// router.put('/update-employee/:id', Update);

module.exports = router;
