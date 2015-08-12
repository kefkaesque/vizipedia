var express = require('express');
var router = express.Router();
module.exports = router;

router.get('/test', function(req, res) {
  var data = [
    {author: "Carter", text: "Hey guys"},
    {author: "David", text: "How's it going?"},
    {author: "Patrick", text: "Not bad, making good progress."},
    {author: "Stephen", text: "Good work!"}
  ];

  res.send(JSON.stringify(data));
});
