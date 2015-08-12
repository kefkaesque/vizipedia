var express = require('express');
var router = express.Router();
// var commentModel = require('../models/comment.js');
module.exports = router;

/* dummy data */
var data = [
  {author: "Carter", text: "Hey guys"},
  {author: "David", text: "How's it going?"},
  {author: "Patrick", text: "Not bad, making good progress."},
  {author: "Stephen", text: "Good work!"}
];
/* end dummy data */

router.get('/:articleId', function(req, res) {
  //commentModel.wikiarticlegetcomment(req.params.articleId);
  res.send(JSON.stringify(data)); /* dummy data */
});

router.post('/:articleId', function(req, res) {
  console.log("article id: ", req.params.articleId);
  console.log("comment:", req.body);
  if (res.locals.user.id) {
    console.log("user id: ", res.locals.user.id)
  }
  //commentModel.addcomment(req.body.text, res.locals.user.id, req.params.articleId);
  data.push(req.body); /* dummy data */
  res.send(JSON.stringify(data)); /* dummy data */
});
