const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadImageAvatar');
const { login, register, processRegister } = require('../controllers/usersControllers');
const registerValidator = require('../validations/registerValidator');



router.get('/login', login)
router.get('/register', register)
router.post('/register', upload.single('image'), registerValidator, processRegister)


module.exports = router;