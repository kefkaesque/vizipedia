var Promise = require('es6-promise').Promise;
var request = require('superagent');

module.exports = {

  createPlaylist: function(playlistName) {
    return new Promise(function(resolve, reject) {
      var playlistData = {
        name: playlistName
      };
      request
        .post('/api/playlist')
        .send(playlistData)
        .end(function(err, res) {
          if (err) {
            reject();
          } else {
            resolve(JSON.parse(res.text));
          }
        });
    });
  },


  addItem: function(topic, playlistId) {
    var playlistData = {
      topic: topic,
      playlistId: playlistId
    };
    return new Promise(function(resolve, reject) {
      request
        .post('/api/playlistitem')
        .send(playlistData)
        .end(function(err, res) {
          if (err) {
            reject();
          } else {
            resolve(JSON.parse(res.text));
          }
        });
    });
  },


  getPlaylistItems: function(playlistId) {
    return new Promise(function(resolve, reject) {
      request
        .get('/api/playlist?id='+playlistId)
        .end(function(err, res) {
          if (err) {
            reject();
          } else {
            resolve(JSON.parse(res.text));
          }
        });
    });
  }

};
