const express = require('express');
const router = express.Router();

const {add, edit, Card, All, Cart} = require('../controllers/productController');

/*Products*/
router.get('/Card', Card)
        .get('/All', All)
        .get('/add', add)
        .get('/edit', edit)

module.exports = router;