const express = require('express');
const router = express.Router();

const {add,edit} = require('../controllers/productController');


router.get('/add', add);
router.get('/edit', edit);

module.exports = router;