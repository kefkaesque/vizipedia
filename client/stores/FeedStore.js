var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FluxConstants = require('../constants/FluxConstants');

var _ = require('underscore');

var feed = {};
function loadData(data) {
  console.log('FeedStore data:', data);
  // var followingUsers = {};
  // for (var i=0; i<data.length; i++) {
  //     followingUsers[data[i].username] = followingUsers[data[i].username]||[];
  //     followingUsers[data[i].username].push(data[i].title)
  // }
  // console.log('followingUsers',followingUsers);


  feed = {data:data};
}

var FeedStore = _.extend({}, EventEmitter.prototype, {

  getData: function() {
    return feed;
  },
  emitChange: function() {
    this.emit('change');
  },
  addChangeListener: function(callback) {
    this.on('change', callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;
  switch(action.actionType) {
    case FluxConstants.FEED_LOAD_DATA:
      loadData(action.data);
      break;
    default:
      // none
  }
  FeedStore.emitChange();
});

module.exports = FeedStore;
