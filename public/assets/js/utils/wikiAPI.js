var FluxActions = require('../actions/FluxActions');

module.exports = {
  // method that gets whatever the server sends by sending
  // req to /api/wiki/:article

  getArticleData: function() {
    var data = 'cat data';
    FluxActions.getArticle(data);
  }
};
