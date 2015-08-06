var express = require('express');
var router = express.Router();
module.exports = router;

router.get('/login', function(req, res) {
  res.render("login");
});

router.post('/login', function(req, res) {
  res.send('post login auth here');
});
