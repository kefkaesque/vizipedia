var RecActions = require('../actions/RecActions');
var $ = require('jquery');

module.exports = {

  getRecData: function(article) {
    $.ajax({
      // add topic to url
      url: '/recommendations/' + article,
      dataType: 'json',
      success: function(data) {
        RecActions.dispatchRec(data);
      },
      error: function(data) {
        console.log('failed');
      }
    });

  }
};
