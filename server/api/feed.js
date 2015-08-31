var express = require('express');
var router = express.Router();
var request = require('request');
var Relation = require('../models/relation');
var Playlist = require('../models/Playlist');
var User = require('../models/User');
var Race = require('../models/Race');
var Racer = require('../models/Racer');

module.exports = router;

router.get('/', function(req, res) {
  var result = {};
  var ids = [];
  var username = [];
  var race = [];
  User.findAll()
  .then(function(users) {
    for (var k = 0; k < users.length; k++){
      username.push(users[k].dataValues.username);
    }
    return username;
  })
  .then(function(userIds) {
    Relation.getFollowing(res.locals.user.id)
    .then(function(userIds) {
      ids = userIds;

      Relation.getFollowingRecommended(ids)
      .then(function(data) {
        result.recArticles = data;
        Relation.getFollowingFollowing(ids)
        .then(function(relation) {
          for (var l = 0; l < relation.length; l++){
            relation[l].follower = username[relation[l].follower-1]
            relation[l].following = username[relation[l].following-1]
          }
          result.followingFollowing = relation;
          Playlist.findAll({
            where: {
              userId: ids,
              createdAt: {
                $lt: new Date(),
                $gt: new Date(new Date() - 3 * 24 * 60 * 60 * 1000)
              }
            }
          })
          .then(function(followingPlaylist) {
            var playlist = [];
            for (var i = 0; i < followingPlaylist.length; i++){
              playlist.push({username: username[followingPlaylist[i].dataValues.userId-1], name:followingPlaylist[i].dataValues.name, createdAt: followingPlaylist[i].dataValues.createdAt});
            }
            result.followingPlaylist = playlist;
            Racer.findAll({
              where: {
                userId: ids,
                  createdAt: {
                    $lt: new Date(),
                    $gt: new Date(new Date() - 3 * 24 * 60 * 60 * 1000)
                  }
              },
              include: [{
                model: Race
              }]
            })
            .then(function(followingRace) {
              var races = [];
              for ( var j = 0; j < followingRace.length; j++) {
                races.push({start: followingRace[j].race.dataValues.start, end: followingRace[j].race.dataValues.end, finishTime: followingRace[j].dataValues.finishTime,
                  racer: username[followingRace[j].dataValues.userId-1], raceId: followingRace[j].race.dataValues.id, createdAt: followingRace[j].dataValues.createdAt});
              }
              result.followingRace = races;
              var sortresult = [];
              for (var key in result){
                for (var m = 0; m < result[key].length; m++){
                  sortresult.push(result[key][m]);
                }
              }
              var tmp;
              for (var o = sortresult.length-1; o >= 0; o--) {
                for (var n = o-1; n >= 0; n--){
                  if (sortresult[o].createdAt > sortresult[n].createdAt){
                    tmp = sortresult[o];
                    sortresult[o] = sortresult[n];
                    sortresult[n] = tmp;
                  }
                }
              }
              for (var p = 0; p < sortresult.length; p++) {
                var options = {
                    weekday: "long", year: "numeric", month: "short",
                    day: "numeric", hour: "2-digit", minute: "2-digit"
                };
                sortresult[p].createdAt = sortresult[p].createdAt.toLocaleTimeString("en-us", options);
              }
              res.send(JSON.stringify(sortresult));
            });
          });
        });
      });
    });
  });
});



