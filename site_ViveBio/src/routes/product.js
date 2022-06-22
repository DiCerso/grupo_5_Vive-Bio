const express = require('express');
const router = express.Router();
const upload =require('../middlewares/uploadImageProduct');
const admincheck = require('../middlewares/admincheck');


const {add, edit, update, store, Card, All, remove, search, list,cart} = require('../controllers/productController');


/*Products*/
router.get('/Card/:id', Card);
router.get('/All', All);
router.get('/add', admincheck, add);
router.post('/add',upload.array('image'), store);
router.get('/edit/:id', admincheck, edit);
router.put('/update/:id',upload.array('image'),update);
router.delete("/remove/:id",admincheck, remove);
router.get("/search", search);
router.get("/list/:category?", admincheck ,list);
router.get('/cart',cart)

module.exports = router;