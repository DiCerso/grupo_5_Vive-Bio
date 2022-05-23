const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const {add, edit, update, store, Card, All, remove} = require('../controllers/productController');

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
router
    .get('/Card/:id', Card)
    .get('/All', All)
    .get('/add', add)
    .post('/add',upload.single('image'), store)
    .get('/edit/:id', edit)
    .put('/update/:id',upload.array('image'),update)
    .delete("/remove/:id", remove)



module.exports = router;