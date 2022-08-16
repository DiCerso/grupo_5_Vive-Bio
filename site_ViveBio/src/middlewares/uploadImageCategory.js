/* const pmulter = require('multer');
const path = require('path');

const storage = pmulter.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/images/category')
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + ' ' + Date.now() + path.extname(file.originalname))
    }
})

const upload = pmulter({
    storage
});
module.exports = upload

 */
let multer = require('multer');
let path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/images/category');
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + '' + Date.now() + path.extname(file.originalname))}
    
})

const uploadFile = multer({storage});

module.exports = uploadFile;