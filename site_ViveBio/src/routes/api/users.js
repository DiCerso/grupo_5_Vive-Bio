const express = require('express');
const router = express.Router();
const upload = require('../../middlewares/uploadImageAvatar');
const registerValidator = require('../../validations/registerValidator');
const editProfileValidator = require('../../validations/editProfileValidator');
const loginValidator = require('../../validations/loginValidator');
const userCheck = require('../../middlewares/userCheck');
const logCheck = require('../../middlewares/logCheck');
const editcheck = require('../../middlewares/editcheck');

const { checkEmail, checkUsername, checkPassword, checkEditUsername,sendMail, loginApi } = require('../../controllers/api/usersController');

/* /api/users  */ 
router.post('/check-username', checkUsername)
      .post('/check-email', checkEmail)
      .post('/check-password', checkPassword)
      .post('/check-edit-user', checkEditUsername)
      .post('/send-mail', sendMail)
      .post('/login', loginApi)

module.exports = router;