var Promise = require('es6-promise').Promise;
var request = require('superagent');

module.exports = {

  getFeedData: function() {
    return new Promise(function(resolve, reject) {
      request
        .get('/api/feed/')
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