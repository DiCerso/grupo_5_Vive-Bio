const express = require('express');
const router = express.Router();
const upload =require('../../middlewares/uploadImageProduct');
const admincheck = require('../../middlewares/admincheck');
const usercheck = require('../../middlewares/userCheck');
const productCheck = require('../../validations/productAddEditValidator')

const {update, store, card, all, remove, search,findone, cart, removecart, cant, addcart} = require('../../controllers/api/productController');


/*/api/products*/
router
    .get('/', all)
    .post('/add',upload.array('images'),productCheck, store)
    .get("/search", search)
    .get("/findone", findone)
    .get('/cart', usercheck, cart)
    .delete('/cart/remove', usercheck, removecart)
    .put('/cart/cant', cant)
    .post("/cart/addcart", addcart)
    .get('/:id', card)
    .put('/:id',upload.array('image'),productCheck,update)
    .delete('/:id', remove)
    


module.exports = router;