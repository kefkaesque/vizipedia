var FeedActions = require('../actions/FeedActions');
var $ = require('jquery');

module.exports = {

  getFeedData: function(user) {
    //get user data and dispatch it
    $.ajax({
      url: '/feed',
      dataType: 'json',
      success: function(data) {
        console.log(data);
        FeedActions.dispatchFeedData(data);
      },
      error: function(data) {
        console.log('failed');
      }
    });
  }
};
