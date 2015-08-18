var ProfileActions = require('../actions/ProfileActions');
var $ = require('jquery');

module.exports = {

  getProfileData: function(user, cb) {

    var result = {};
    result.username = user;

    $.ajax({
      // add username to url
      url: '/profile/' + user,
      dataType: 'json',
      success: function(data) {
        console.log('data from prfile get request', data);
        //change data content, should include username & #of article read
        result.numArticle = data;
        cb();
        ProfileActions.dispatchProfileData(result);
      },
      error: function(data) {
        console.log('failed');
      }
    });





  }
};
