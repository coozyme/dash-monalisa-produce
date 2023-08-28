var express = require('express');
var router = express.Router();
const { productList } = require('../controller/product.js')

// const { isLoginAdmin } = require('../middleware/auth')

// router.use(isLoginAdmin)
router.get('/', productList);
router.get('/products-add', productList);

module.exports = router;
