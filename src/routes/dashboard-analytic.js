var express = require('express');
var router = express.Router();
const { StatusMachine, TotalStatusProduksi, IssueProduksi } = require('../controller/dashboard-analytic')

// const { isLoginAdmin } = require('../middleware/auth')

// router.use(isLoginAdmin)
// router.get('/auth', function (req, res) { res.redirect('/auth/login') })
router.get('/status-machine', StatusMachine);
router.get('/status-productions', TotalStatusProduksi);
router.get('/issue-productions', IssueProduksi);
// router.post('/regist', Register);
// router.get('/generate-password', GeneratePassword);
// router.post('/change-password', ChangePassword);

module.exports = router;
