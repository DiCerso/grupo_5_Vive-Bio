const router = require('express').Router();

const {index} = require('../controllers/indexController');


router.get('/', index);

module.exports = router;