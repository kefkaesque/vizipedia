var express = require('express');
var router = express.Router();
module.exports = router;

var Race = require('../models/Race.js');
var Racer = require('../models/Racer.js');
var Article = require('../models/WikiArticle.js');

router.post('/', function(req, res) {

  var userId = req.user.id;

  if(!req.body.raceId) {
    //if the race id is not provided, create a race
    var startTopic = req.body.startTopic;
    var endTopic = req.body.endTopic;
    var raceInfo = {};

    getArticleId(startTopic)
    .then(function(startArticle) {
      raceInfo.startId = startArticle.id;
      return getArticleId(endTopic);
    })
    .then(function(endArticle) {
      raceInfo.endId = endArticle.id;
    })
    .then(function() {
      return createRace(raceInfo.startId, raceInfo.endId)
    })
    .then(function(race) {
      raceInfo.raceId = race.id;
      res.send(JSON.stringify(raceInfo));
    })
  } else {
    //if the race id is provided, post results
    var raceId = req.body.raceId;
    var finishTime = req.body.finishTime;
    var path = req.body.path;

    createRacer(raceId, userId, finishTime, path)
      .then(function(){
        return getRacerInfo(raceId);
      })
      .then(function(racerInfo) {
        res.send(JSON.stringify(racerInfo));
      });
  }

});

router.get('/:raceId', function(req, res) {
  var raceId = req.query.raceId;
  getRacerInfo(raceId)
  .then(function(racerInfo) {
    res.send(JSON.stringify(racerInfo));
  })
});
// --------------------------------------------------------------------------------

function getArticleId(topic) {
  return Article.findOne({
    where: {title: topic}
  });
};

function createRace(startId, endId) {
  return Race.create({
    startId: startId,
    endId: endId
  });
}

function createRacer(raceId, userId, finishTime, path) {
  return Racer.create({
    raceId: raceId,
    userId: userId,
    finishTime: finishTime,
    path: JSON.stringify(path)
  });
}

function getRacerInfo(raceId) {
  return Racer.findAll({
    where: {raceId: raceId}
  });
}
