var express = require('express');
var router = express.Router();
module.exports = router;

var Race = require('../models/Race.js');
var Racer = require('../models/Racer.js');
var Article = require('../models/WikiArticle.js');
var User = require('../models/User');

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

router.get('/', function(req, res) {
  var raceId = req.query.raceid;
  var userId = req.query.userid;
  var result = {};
  if(raceId) {

    getRaceInfo(raceId)
    .then(function(raceInfo) {
      result.raceInfo = raceInfo;
      return getRacerInfo(raceId);
    })
    .then(function(racerInfo) {
      result.racerInfo = racerInfo;
      res.send(JSON.stringify(result));
    });

  }else if(userId) {
    getUserRaces(userId)
    .then(function(raceInfo) {
      res.send(JSON.stringify(raceInfo));
    });
  }

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

function getRaceInfo(raceId) {
  return Race.findOne({
    where: {id: raceId}
  });
}

function getRacerInfo(raceId) {
  return Racer.findAll({
    where: {raceId: raceId},
    include: [{
      model: User,
      attributes: ['username']
    }]
  });
}

function getUserRaces(userId) {
  return Racer.findAll({
    where: {userId: userId},
    include: [{
      model: Race
    }]
  });
};
