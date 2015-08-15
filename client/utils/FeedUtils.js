var FeedActions = require('../actions/FeedActions');

module.exports = {

  getFeedData: function(user) {
    //get user data and dispatch it
    var data = {
      username: 'dummy data'
    };
    FeedActions.dispatchFeedData(data);
  }
};
