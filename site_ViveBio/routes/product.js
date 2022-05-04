const express = require('express');
const router = express.Router();

const {productCard, productAll, productCart} = require('../controllers/productController');

/*Products*/
router.get('/productCard/:id', productCard);
router.get('/productAll', productAll);
router.get('/productCart', productCart);

module.exports = router;