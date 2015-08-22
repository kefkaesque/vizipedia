var Promise = require('es6-promise').Promise;
var request = require('superagent');

module.exports = {

  postRace: function(data) {
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

  postFinish: function
};

