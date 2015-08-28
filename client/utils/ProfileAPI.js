var Promise = require('es6-promise').Promise;
var request = require('superagent');

module.exports = {

  getProfileData: function(user) {
    return new Promise(function(resolve, reject) {
      request
        .get('/api/profile/'+user)
        .end(function(err, res) {
          if (err) {
            reject();
          } else {
            resolve(JSON.parse(res.text));
          }
        });
    });
  },

  getUserPlaylists: function(userId) {
    return new Promise(function(resolve, reject) {
      request
        .get('/api/playlist?userid='+userId)
        .end(function(err, res) {
          if (err) {
            reject();
          } else {
            resolve(JSON.parse(res.text));
          }
        });
    });
  },

  getUserRaces: function(userId) {
    return new Promise(function(resolve, reject) {
      request
        .get('/api/race?userid='+userId)
        .end(function(err, res) {
          if (err) {
            reject();
          } else {
            resolve(JSON.parse(res.text));
          }
        });
    });
  },

  postFollow: function(user) {
    var userData = {
      user:user
    };
    return new Promise(function(resolve, reject) {
      request
        .post('/api/profile/')
        .send(userData)
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

