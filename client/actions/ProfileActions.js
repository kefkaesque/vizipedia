var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var FluxConstants = require('../constants/FluxConstants.js');
var ProfileAPI = require('../utils/ProfileAPI.js');
var RecActions = require('./RecActions.js');

var ProfileActions = {

  /** 
  * sends request to server to get profile data based on currently viewed profile
  * uses returned user id to retrieve information on playlists, races, and recommendations
  */
  dispatchProfileData: function(data) {
    var that = this;
    ProfileAPI.getProfileData(data)
    .then(function(profile) {
      that.dispatchUserPlaylists(profile.id);
      that.dispatchUserRaces(profile.id);
      RecActions.dispatchUserRecs(profile.id);
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

  // sends request to server to retrieve user playlist info based on user id and dispatches
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

  // sends request to server to retrieve races a user has created based on user id and dispatches
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

  // sends post to server to follow the current user whose profile is being viewed and dispatches
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
