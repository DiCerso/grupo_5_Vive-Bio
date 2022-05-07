const express = require('express');
const router = express.Router();

const {add, edit, Card, All} = require('../controllers/productController');

/*Products*/
router.get('/Card', Card);
router.get('/All', All);
router.get('/add', add);
router.get('/edit', edit);

module.exports = router;