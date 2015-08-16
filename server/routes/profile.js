
var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var visitedArticle = require('../models/visitedArticle.js');
module.exports = router;

router.get('/:userName', function(req, res) {
  User.findOne({
    where: {
      username: req.params.userName
    }
  })
  .then(function(user) {
    console.log('username:',req.params.userName)
    console.log('user.dataValues.id :',user.dataValues.id);
    visitedArticle.numRead(user.dataValues.id)
    .then(function(profile){
      console.log('visitedArticle.numRead profile', profile)
      res.send(JSON.stringify(profile));
    });
    
  })

});