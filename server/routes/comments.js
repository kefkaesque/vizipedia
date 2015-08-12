var express = require('express');
var router = express.Router();
module.exports = router;

var data = [
  {author: "Carterx", text: "Hey guys"},
  {author: "David", text: "How's it going?"},
  {author: "Patrick", text: "Not bad, making good progress."},
  {author: "Stephen", text: "Good work!"}
];

router.get('/test', function(req, res) {
  res.send(JSON.stringify(data));
});

router.post('/test', function(req, res) {
  console.log(req.body);
  data.push(req.comment);
  res.send(JSON.stringify(data));
});
