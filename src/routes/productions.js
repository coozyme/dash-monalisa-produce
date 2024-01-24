var express = require('express');
var router = express.Router();
const { AddorderProduction, GetOrderProductions, UpdateOrderProduction, DeleteOrderProduction } = require('../controller/productions.js')
const { CreateReporting, DetailReporting, ChecklistMaterial, ApproveReport } = require('../controller/production-report.js')

// const { isLoginAdmin } = require('../middleware/auth')

// router.use(isLoginAdmin)
// router.get('/', productList);
router.get('/order-productions', GetOrderProductions);
router.post('/add-order-production', AddorderProduction);
router.put('/order-production/:id', UpdateOrderProduction);
router.post('/order-production/:orderId', DeleteOrderProduction);

router.post('/create-reporting-production', CreateReporting);
router.get('/detail-reporting-production', DetailReporting);
router.post('/approve-checklist', ChecklistMaterial);
router.post('/approve-report', ApproveReport);

module.exports = router;
