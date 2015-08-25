var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var FluxConstants = require('../constants/FluxConstants.js');
var ProfileAPI = require('../utils/ProfileAPI.js');
var RecActions = require('./RecActions.js');

var ProfileActions = {
  dispatchProfileData: function(data) {
    var that = this;
    ProfileAPI.getProfileData(data)
    .then(function(profile) {
      if (profile.followedBy !== undefined) {
      that.dispatchUserPlaylists(profile.id);
      that.dispatchUserRaces(profile.id);
      RecActions.dispatchUserRecs(profile.id);
      AppDispatcher.handleViewAction({
        actionType: FluxConstants.PROFILE_LOAD_DATA,
        data: profile
      });
      } else {
      AppDispatcher.handleViewAction({
        actionType: FluxConstants.PROFILE_LOAD_DATA,
        data: profile
      })
      }
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
  },

  dispatchUserRaces: function(data) {
    ProfileAPI.getUserRaces(data)
    .then(function(race) {
      AppDispatcher.handleViewAction({
        actionType: FluxConstants.PROFILE_LOAD_RACES,
        data: race
      });
    })
    .catch(function() {
      AppDispatcher.handleViewAction({
        actionType: FluxConstants.ERROR,
        error: 'bad req'
      });
    });
  },

  dispatchFollow: function(data) {
    ProfileAPI.postFollow(data)
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
  }

};

module.exports = ProfileActions;
