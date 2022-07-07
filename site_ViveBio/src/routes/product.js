const express = require('express');
const router = express.Router();
const upload =require('../middlewares/uploadImageProduct');
const admincheck = require('../middlewares/admincheck');


const {add, edit, update, store, card, all, remove, search, list} = require('../controllers/productController');


/*Products*/
router.get('/card/:id', card);
router.get('/all', all);
router.get('/add', admincheck, add);
router.post('/add',upload.array('image'), store);
router.get('/edit/:id', admincheck, edit);
router.put('/update/:id',upload.array('image'),update);
router.delete("/remove/:id",admincheck, remove);
router.get("/search", search);
router.get("/list/:category?", admincheck ,list);

module.exports = router;