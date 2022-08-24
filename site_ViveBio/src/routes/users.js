const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadImageAvatar');
const registerValidator = require('../validations/registerValidator');
const editProfileValidator = require('../validations/editProfileValidator');
const loginValidator = require('../validations/loginValidator');
const userCheck = require('../middlewares/userCheck');
const logCheck = require('../middlewares/logCheck');
const editcheck = require('../middlewares/editcheck')

const { login, processLogin, register, processRegister, logout, profile, editProfile, processEditProfile, updatePass, cropertest, processCropper, deleteUser } = require('../controllers/usersControllers');




router.get('/login', logCheck, login)
router.post('/login', loginValidator, processLogin);
router.put('/updatepass/:id', updatePass)
router.get('/register', logCheck, register)
router.post('/register', upload.single('image'), registerValidator, processRegister)
router.get('/logout', logout);
router.get('/profile/:id', userCheck, profile);
router.get('/profile/edit/:id', editcheck, editProfile)
router.put('/profile/edit/update/:id', upload.single('image'), editProfileValidator, processEditProfile)
router.get('/testcropper', cropertest)
router.post('/processcropper', upload.single('input-file'), processCropper)
router.delete('/delete/:id', deleteUser)


module.exports = router;





