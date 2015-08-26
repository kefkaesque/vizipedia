var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var FluxConstants = require('../constants/FluxConstants.js');
var FeedAPI = require('../utils/FeedAPI.js');

var FeedActions = {

  dispatchFeedData: function(data) {
    FeedAPI.getFeedData(data)
    .then(function(feeddata) {
      console.log('FeedActions feeddata', feeddata);
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
