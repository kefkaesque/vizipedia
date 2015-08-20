var Promise = require('es6-promise').Promise;
var request = require('superagent');

module.exports = {

  getProfileData: function(user) {
    return new Promise(function(resolve, reject) {
      request
        .get('/profile/'+user)
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

  postFollow: function(user) {
    var userData = {
      user:user
    };
    return new Promise(function(resolve, reject) {
      request
        .post('/profile/')
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

