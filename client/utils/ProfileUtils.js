var ProfileActions = require('../actions/ProfileActions');

module.exports = {

  getProfileData: function(user) {
    //get user data and dispatch it
    var data = {
      username: 'carterchung'
    };
    ProfileActions.dispatchProfileData(data);
  }
};
