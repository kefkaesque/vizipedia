var ProfileActions = require('../actions/ProfileActions');
var $ = require('jquery');

module.exports = {

  getProfileData: function(user, cb) {
    $.ajax({
      url: '/profile/' + user,
      dataType: 'json',
      success: function(data) {
        cb();
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
  }
};



