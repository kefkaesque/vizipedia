var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FluxConstants = require('../constants/FluxConstants');
var assign = require('object-assign');

var playlistInfo = {};
function loadData(data) {
  playlistInfo = data;
}
function loadQuery(data) {
  playlistInfo.query = data;
}

function setViewing(playlist) {
  playlistInfo = {
    viewing: true,
    current: playlist,
    currentItem: 0
  };
}

function setCurrentItem(index) {
  playlistInfo.currentItem = index;
}

function closePlaylist() {
  playlistInfo.viewing = false;
}

var PlaylistStore = assign({}, EventEmitter.prototype, {

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
      break;
    case FluxConstants.PLAYLIST_VIEWING:
      setViewing(action.data);
      break;
    case FluxConstants.PLAYLIST_CLOSED:
      closePlaylist();
      break;
    case FluxConstants.PLAYLIST_NAV:
      setCurrentItem(action.data);
      break;
    default:
      // none
  }
  PlaylistStore.emitChange();
});

module.exports = PlaylistStore;
