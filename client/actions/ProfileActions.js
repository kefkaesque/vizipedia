var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var FluxConstants = require('../constants/FluxConstants.js');
var ProfileAPI = require('../utils/ProfileAPI.js');

var ProfileActions = {
  dispatchProfileData: function(data) {
    ProfileAPI.getProfileData(data)
    .then(function(profile) {
      AppDispatcher.handleViewAction({
        actionType: FluxConstants.PROFILE_LOAD_DATA,
        data: profile
      });
    })
    .catch(function() {
      AppDispatcher.handleViewAction({
        actionType: FluxConstants.ERROR,
        error: 'bad req'
      });
    });
  },

  dispatchUserPlaylists: function(data) {
    ProfileAPI.getUserPlaylists(data)
    .then(function(playlist) {
      AppDispatcher.handleViewAction({
        actionType: FluxConstants.PROFILE_LOAD_PLAYLISTS,
        data: playlist
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

module.exports = ProfileActions;
