const express = require('express');
const router = express.Router();

const { add, edit, Card, All, Cart } = require('../controllers/productController');

/*Products*/
router.get('/Card/:id', Card);
router.get('/All', All);
router.get('/Cart', Cart);
router.get('/add', add);
router.get('/edit', edit);

module.exports = router;