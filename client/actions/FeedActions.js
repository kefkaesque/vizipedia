var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var FluxConstants = require('../constants/FluxConstants.js');
var FeedAPI = require('../utils/FeedAPI.js');

var FeedActions = {

  // sends API request to our server and dispatches returned activity data of those followed by logged-in user
  dispatchFeedData: function() {
    FeedAPI.getFeedData()
    .then(function(feeddata) {
      AppDispatcher.handleViewAction({
        actionType: FluxConstants.FEED_LOAD_DATA,
        data: feeddata
      });
    })
    .catch(function() {
      AppDispatcher.handleViewAction({
        actionType: FluxConstants.ERROR,
        error: 'bad req'
      });
    });
  }
};

module.exports = FeedActions;
