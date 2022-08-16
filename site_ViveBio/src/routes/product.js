const express = require('express');
const router = express.Router();
const upload =require('../middlewares/uploadImageProduct');
const admincheck = require('../middlewares/admincheck');
const usercheck = require('../middlewares/userCheck');
const productCheck = require('../validations/productAddEditValidator')

const {add, edit, update, store, card, all, remove, search, list, cart, removecart, cant} = require('../controllers/productController');


/*Products*/
router.get('/card/:id', card);
router.get('/all', all);
router.get('/add', admincheck, add);
router.post('/add',upload.array('images'),productCheck, store);
router.get('/edit/:id', admincheck, edit);
router.put('/update/:id',upload.array('image'),productCheck,update);
router.delete('/remove/:id',admincheck, remove);
router.get("/search", search);
router.get("/list", admincheck ,list);
router.get('/cart', usercheck, cart)
router.delete('/cart/remove/:id', usercheck, removecart )
router.put('/cart/cant/:idproduct/:id', usercheck, cant)

module.exports = router;