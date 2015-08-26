var express = require('express');
var router = express.Router();
var request = require('request');
var Relation = require('../models/relation.js');
var Playlist = require('../models/Playlist.js');
var User = require('../models/User');

module.exports = router;

router.get('/', function(req, res) {
  var result = {};
  var ids = [];
  var username = [];
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
      // console.log('api ids:', data);
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
            console.log('followingPlaylist:',followingPlaylist)
            var playlist = [];
            for (var i = 0; i < followingPlaylist.length; i++){
              playlist.push({username: username[followingPlaylist[i].dataValues.userId-1], name:followingPlaylist[i].dataValues.name, createdAt: followingPlaylist[i].dataValues.createdAt});
            }
            result.followingPlaylist = playlist;
            console.log('feedAPI result:',result);
            res.send(JSON.stringify(result));
          });
        });
      });
    });
  });
});
