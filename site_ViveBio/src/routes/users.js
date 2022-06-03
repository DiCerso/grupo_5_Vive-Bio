const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadImageAvatar');
const registerValidator = require('../validations/registerValidator');
const loginValidator = require ('../validations/loginValidator');
const userCheck = require('../middlewares/userCheck');
const {login, processLogin, register, processRegister, logout, profile} = require('../controllers/usersControllers');




router.get('/login', login)
router.post('/login',loginValidator,processLogin);
router.get('/register', register)
router.post('/register', upload.single('image'), registerValidator, processRegister)
router.get('/logout',logout);
router.get('/profile/:id',userCheck, profile);


module.exports = router;





