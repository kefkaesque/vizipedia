var ProfileActions = require('../actions/ProfileActions');

module.exports = {

  getProfileData: function(user) {
    //get user data and dispatch it
    // var data = {
    //   username: 'carterchung'
    // };
    user = 'carterchung';

    $.ajax({
      // add username to url
      url: '/profile/' + user,
      dataType: 'json',
      success: function(data) {
        console.log(data);
        ProfileActions.dispatchProfileData(data);
      },
      error: function(data) {
        console.log('failed');
      }
    });





  }
};
