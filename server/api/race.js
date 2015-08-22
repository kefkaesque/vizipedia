var express = require('express');
var router = express.Router();
module.exports = router;

//Require the associated models (Race, Racer)

router.post('/', function(req, res) {

  if(req.body.raceId) {
  // If race exists, indicate that user has finished
    // incoming: raceId, finishTime, path (array of articleId)
    // user id stored in locals

    // set finishTime and path of racer model corresponding to user id
    // get racer models of everyone who is done

    // send back array of objects of everyone who is done (racer models)
    // each object has a username, path (array of article topics), and finishTime
  } else {
  // Create a race
    // incoming: startTopic, endTopic, users (array of usernames)
    // user id stored in locals

    // create new race model with startTopic, endTopic
    // then, for each user, including logged in user, create new racer models with raceId from above
    // need to get user ids from usernames
    // finish time: null, path: null

    // send back raceId, startId, endId
  }
});

router.get('/:raceId', function(req, res) {
  var raceId = req.query.raceId;
  // get racer models of everyone who is done corresponding to raceId

  // send back array of objects of everyone who is done (racer models)
});
// --------------------------------------------------------------------------------
