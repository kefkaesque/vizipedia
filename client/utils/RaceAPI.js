var Promise = require('es6-promise').Promise;
var request = require('superagent');

module.exports = {

  postRace: function(data) {

    return new Promise(function(resolve, reject) {
      request
        .post('/api/race')
        .send(data)
        .end(function(err, res) {
          if (err) {
            reject();
          } else {
            resolve(JSON.parse(res.text));
          }
        });
    });
  },

  postFinish: function(data) {

    return new Promise(function(resolve, reject) {
      request
        .post('/api/race')
        .send(data)
        .end(function(err, res) {
          if (err) {
            reject();
          } else {
            resolve(JSON.parse(res.text));
          }
        });
    });
  },

  getRaceData: function(raceId) {
    return new Promise(function(resolve, reject) {
      request
        .get('/api/race/?raceid='+raceId)
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

