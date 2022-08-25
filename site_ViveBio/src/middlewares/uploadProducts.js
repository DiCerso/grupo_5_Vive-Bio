const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req,file,callback) => {
        callback(null,'public/images/products')
    },
    filename: (req,file,callback) => {
        callback(null,'img-phone-' + Date.now() + path.extname(file.originalname))
    },
    
});

const fileFilter = function(req, file,callback) {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)){
        req.fileValidationError = "Solo se permite imágenes";
        return callback(null,false,req.fileValidationError);
    }
    callback(null,true);
}

const upload = multer({
    storage,
    fileFilter
})

module.exports = upload