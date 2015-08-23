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

    createRace(startTopic, endTopic)
    .then(function(raceInfo) {
      res.send(JSON.stringify(raceInfo));
    });

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

function createRace(start, end) {
  return Race.create({
    start: start,
    end: end
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
