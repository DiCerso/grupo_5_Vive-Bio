const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const {add, edit, update, store, Card, All, remove, search} = require('../controllers/productController');

/* MULTER */
const storage = multer.diskStorage({
    destination : (req,file,callback) => {
        callback(null,'public/images')
    },
    filename : (req,file,callback) => {
        callback(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage
})

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