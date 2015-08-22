var Promise = require('es6-promise').Promise;
var request = require('superagent');

module.exports = {

  postRace: function(data) {
    // this is what data should look like
    // data: {
    //   startTopic:
    //   endTopic:
    //   users: []
    // }
    return new Promise(function(resolve, reject) {
      request
        .post('/race')
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
    // this is what data should look like
    // data: {
    //  finishTime
    //  raceId
    //  path
    // }
    return new Promise(function(resolve, reject) {
      request
        .post('/race')
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
        .get('/race/'+raceId)
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

