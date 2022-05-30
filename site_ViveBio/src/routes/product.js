const express = require('express');
const router = express.Router();
const upload =require('../middlewares/uploadImageProduct');

const {add, edit, update, store, Card, All, remove, search} = require('../controllers/productController');


/*Products*/
router.get('/Card/:id', Card);
router.get('/All', All);
router.get('/add', add);
router.post('/add',upload.array('image'), store);
router.get('/edit/:id', edit);
router.put('/update/:id',upload.array('image'),update)
router.delete("/remove/:id", remove)
router.get("/search", search);


module.exports = router;