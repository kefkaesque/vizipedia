var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FluxConstants = require('../constants/FluxConstants');
var assign = require('object-assign');

var profileData = {
};

function storeProfileData(data) {
  profileData = data;
}

function storeUserPlaylists(data) {
  profileData.playlists = data;
}

function storeUserRaces(data) {
  profileData.races = data;
}

var ProfileStore = assign({}, EventEmitter.prototype, {

  getData: function() {
    return profileData;
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
    case FluxConstants.PROFILE_LOAD_DATA:
      storeProfileData(action.data);
      break;
    case FluxConstants.PROFILE_LOAD_PLAYLISTS:
      storeUserPlaylists(action.data);
      break;
    case FluxConstants.PROFILE_LOAD_RACES:
      storeUserRaces(action.data);
      break;
    default:
      // none
  }
  ProfileStore.emitChange();
});

module.exports = ProfileStore;
