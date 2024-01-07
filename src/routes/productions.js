var express = require('express');
var router = express.Router();
const { AddorderProduction, GetOrderProductions, UpdateOrderProduction, DeleteOrderProduction } = require('../controller/productions.js')

// const { isLoginAdmin } = require('../middleware/auth')

// router.use(isLoginAdmin)
// router.get('/', productList);
router.get('/order-productions', GetOrderProductions);
router.post('/add-order-production', AddorderProduction);
router.put('/order-production/:orderId', UpdateOrderProduction);
router.post('/order-production/:orderId', DeleteOrderProduction);

module.exports = router;
