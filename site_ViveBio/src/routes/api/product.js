const express = require('express');
const router = express.Router();
const upload =require('../../middlewares/uploadImageProduct');
const admincheck = require('../../middlewares/admincheck');
const usercheck = require('../../middlewares/userCheck');
const productCheck = require('../../validations/productAddEditValidator')

const {update, store, card, all, remove, search,findone, cart, removecart} = require('../../controllers/api/productController');


/*/api/products*/
router
    .get('/', all)
    .post('/add',upload.array('images'),productCheck, store)
    .get("/search", search)
    .get("/findone", findone)
    .get('/cart', usercheck, cart)
    .delete('/cart/remove/:id', usercheck, removecart)
    .get('/:id', card)
    .put('/:id',upload.array('image'),productCheck,update)
    .delete('/:id', remove)


module.exports = router;