var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FluxConstants = require('../constants/FluxConstants');

var _ = require('underscore');

var playlistInfo = {};
function loadData(data) {
  console.log('PlaylistStore: loadData: ', data);
  playlistInfo = data;
}

var PlaylistStore = _.extend({}, EventEmitter.prototype, {

  getPlaylistInfo: function() {
    return playlistInfo;
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

AppDispatcher.register(function(action) {
  var text;
  switch(action.actionType) {
    case FluxConstants.PLAYLIST_CREATED:
      console.log("PlaylistStore: Registered and seen ", action.data);
      loadData(action.data);
      break;
    default:
      // none
  }
  PlaylistStore.emitChange();
});

module.exports = PlaylistStore;
