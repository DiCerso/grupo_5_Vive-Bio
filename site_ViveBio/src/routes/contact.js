const router = require('express').Router();


router.get('/', function(req, res, next) {
  res.render('contact', { title: 'contacto' });
});

module.exports = router;