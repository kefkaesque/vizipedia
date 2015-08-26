var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FluxConstants = require('../constants/FluxConstants');

var _ = require('underscore');

var playlistInfo = {};
function loadData(data) {
  playlistInfo = data;
}
function loadQuery(data) {
  playlistInfo.query = data;
}

function setViewing() {
  playlistInfo.viewing = true;
}

function closePlaylist() {
  playlistInfo.viewing = false; //careful -- might need to clear rest of properties
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

AppDispatcher.register(function(payload) {
  var action = payload.action;
  switch(action.actionType) {
    case FluxConstants.PLAYLIST_EDITED:
      loadData(action.data);
      break;
    case FluxConstants.QUERY:
      loadQuery(action.data);
    case FluxConstants.PLAYLIST_VIEWING:
      setViewing();
      break;
    case FluxConstants.PLAYLIST_CLOSED:
      closePlaylist();
      break;
    default:
      // none
  }
  PlaylistStore.emitChange();
});

module.exports = PlaylistStore;
