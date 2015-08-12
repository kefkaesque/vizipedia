var express = require('express');
var router = express.Router();
module.exports = router;

router.get('/test', function(req, res) {
  res.send(JSON.stringify("Hello Carter!"));
});
