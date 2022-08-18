const express = require('express');
const router = express.Router();

const { checkEmail, checkUsername, checkPassword, checkEditUsername,sendMail, all, remove, changerol, search, changeubication,apiLogin} = require('../../controllers/api/usersController');

/* /api/users  */ 

router.post('/check-username', checkUsername);
router.post('/check-email', checkEmail);
router.post('/check-password', checkPassword)
router.post('/check-edit-user', checkEditUsername)
router.post('/send-mail', sendMail)
router.get('/all', all)
router.delete('/destroy/:id', remove)
router.put('/changerol', changerol)
router.put('/changeubication', changeubication)
router.get('/search', search)
router.post('/login',apiLogin)

module.exports = router;