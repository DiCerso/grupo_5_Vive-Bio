const express = require('express');
const router = express.Router();
const upload =require('../middlewares/uploadImageProduct');
const admincheck = require('../middlewares/admincheck');
const usercheck = require('../middlewares/userCheck');
const productCheck = require('../validations/productAddEditValidator')

const {add, edit, update, store, remove, list} = require('../controllers/categoryController');


/*Category*/
router.get('/add', admincheck, add);
router.post('/add',upload.array('images'),productCheck, store);
router.get('/edit/:id', admincheck, edit);
router.put('/update/:id',upload.array('image'),productCheck,update);
router.delete('/remove/:id',admincheck, remove);
router.get("/list", admincheck, list);

module.exports = router;