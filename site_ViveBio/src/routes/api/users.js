const express = require('express');
const router = express.Router();
const upload = require('../../middlewares/uploadImageAvatar');
const registerValidator = require('../../validations/registerValidator');
const editProfileValidator = require('../../validations/editProfileValidator');
const loginValidator = require('../../validations/loginValidator');
const userCheck = require('../../middlewares/userCheck');
const logCheck = require('../../middlewares/logCheck');
const editcheck = require('../../middlewares/editcheck');

const { checkEmail, checkUsername, findUser } = require('../../controllers/api/usersController');


router.post('/check-username', checkUsername);
router.post('/check-email', checkEmail);
router.post('/find-User', findUser)

module.exports = router;