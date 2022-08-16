const express = require('express');
const router = express.Router();
const uploadFile =require('../middlewares/uploadImageCategory');
const admincheck = require('../middlewares/admincheck');
const productCheck = require('../validations/productAddEditValidator')

const {add, edit, update, store, remove} = require('../controllers/categoryController');


/*Category*/
router.get('/add', admincheck, add);
router.post('/add',uploadFile.single('image'),productCheck, store);
router.get('/edit/:id', admincheck, edit);
router.put('/update/:id',uploadFile.single('image'),productCheck,update);
router.delete('/remove/:id',admincheck, remove);

module.exports = router;