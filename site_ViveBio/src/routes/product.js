const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadImageProduct');
const upload2 = require('../middlewares/uploadProducts')
const admincheck = require('../middlewares/admincheck');
const usercheck = require('../middlewares/userCheck');
const productCheck = require('../validations/productAddEditValidator')

const { add, edit, update, store, card, all, remove, search, list, cart, removecart, cant } = require('../controllers/productController');


/*Products*/
router.get('/card/:id', card);
router.get('/all', all);
router.get('/add', admincheck, add);
router.post('/add', upload.array('images'), productCheck, store);
router.get('/edit/:id', admincheck, edit);
router.put('/update/:id', upload.fields([
    { name: 'images1', maxCount: 1 },
    { name: 'images2', maxCount: 1 },
    { name: 'images3', maxCount: 1 }
]), productCheck, update);
router.delete('/remove/:id', admincheck, remove);
router.get("/search", search);
router.get("/list", admincheck, list);
router.get('/cart', usercheck, cart)
router.delete('/cart/remove/:id', usercheck, removecart)
router.put('/cart/cant/:idproduct/:id', usercheck, cant)

module.exports = router;