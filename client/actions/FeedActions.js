var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var FluxConstants = require('../constants/FluxConstants.js');

var FeedActions = {

  dispatchFeedData: function(data) {
    AppDispatcher.dispatch({
      actionType: FluxConstants.FEED_LOAD_DATA,
      data: data
    });
  }
};

module.exports = FeedActions;
