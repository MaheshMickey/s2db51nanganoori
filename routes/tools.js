var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('tools', { title: 'Search Results of Tools' });
});

module.exports = router;
