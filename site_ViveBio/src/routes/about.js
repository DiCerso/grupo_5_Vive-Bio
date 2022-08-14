const router = require('express').Router();


router.get('/', function(req, res, next) {
  res.render('about', { title: 'about' });
});

module.exports = router;