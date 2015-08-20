var Promise = require('es6-promise').Promise;
var request = require('superagent');

module.exports = {

  getUserRecs: function(userId) {
    return new Promise(function(resolve, reject) {
      request
        .get('/api/recommend?userid='+userId)
        .end(function(err, res) {
          if (err) {
            reject();
          } else {
            resolve(JSON.parse(res.text));
          }
        });
    });
  },

  getArticleRecs: function(articleId) {
    return new Promise(function(resolve, reject) {
      request
        .get('/api/recommend?articleid='+articleId)
        .end(function(err, res) {
          if (err) {
            reject();
          } else {
            resolve(JSON.parse(res.text));
          }
        });
    });
  },

  postRec: function(articleId) {
    return new Promise(function(resolve, reject) {
      request
        .post('/api/recommend/')
        .send({articleId: articleId})
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
