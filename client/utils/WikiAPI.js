var Promise = require('es6-promise').Promise;
var request = require('superagent');

module.exports = {
  getArticleData: function(topic) {
    return new Promise(function(resolve, reject) {
      request
        .get('/api/wiki/'+topic)
        .end(function(err, res) {
          if (err) {
            reject();
          } else {
            resolve(JSON.parse(res.text));
          }
        });
    });
  },

  getArticleQuery: function(topic) {
    return new Promise(function(resolve, reject) {
      request
        .get('/api/wiki/query/'+topic)
        .end(function(err, res) {
          if (err) {
            reject();
          } else {
            resolve(JSON.parse(res.text));
          }
        });
    });
  },

  getAutoComplete: function(topic) {
    return new Promise(function(resolve, reject) {
      request
        .get('/api/wiki/auto/'+topic)
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
