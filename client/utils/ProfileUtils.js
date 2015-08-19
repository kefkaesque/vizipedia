var ProfileActions = require('../actions/ProfileActions');
var $ = require('jquery');

module.exports = {

  getProfileData: function(user, cb) {
    $.ajax({
      url: '/profile/' + user,
      dataType: 'json',
      success: function(data) {
        cb(data);
        ProfileActions.dispatchProfileData(data);
      },
      error: function(data) {
        console.log('failed');
      }
    })
  },

  postProfileData: function(user) {
    var userData = {
      user:user
    };

    $.ajax({
      url: '/profile/',
      dataType: 'json',
      type: 'POST',
      data: userData,
      success: function(data) {
        ProfileActions.dispatchProfileData(data);
      },
      error: function(data) {
        console.error('failed');
      }
    });
  },

  getUserPlaylists: function(userId) {
    $.ajax({
      url: '/api/playlist?userid='+userId,
      dataType: 'json',
      success: function(data) {
        ProfileActions.dispatchUserPlaylists(data);
      },
      error: function(xhr, status, err) {
        console.error('/api/playlist', status, err.toString());
      }
    });
  },
};



