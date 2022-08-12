const router = require('express').Router();

const {index} = require('../../controllers/api/indexController');


router.get('/', index);

module.exports = router;