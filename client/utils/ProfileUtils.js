var ProfileActions = require('../actions/ProfileActions');
var $ = require('jquery');

module.exports = {

  getProfileData: function(user, cb) {

    // var result = {};
    // result.username = user;

    $.ajax({
      // add username to url
      url: '/profile/' + user,
      dataType: 'json',
      success: function(data) {
        console.log('data from prfile get request', data);
        //change data content, should include username & #of article read
        // result.numArticle = data.numArticle;
        cb();
        ProfileActions.dispatchProfileData(data);
      },
      error: function(data) {
        console.log('failed');
      }
    })
  },

  postProfileData: function(user) {
  //  var result = {};
    // console.log('postProfileData user:',user)
    user = {user:user}; // remove later
  //  result.username = user;

    $.ajax({
      url: '/profile/',
      dataType: 'json',
      type: 'POST',
      data: user,
      success: function(data) {
        console.log(data);
        // result.numArticle = data.numArticle;
        ProfileActions.dispatchProfileData(data);// modify the data
      },
      error: function(data) {
        console.error('failed');
      }
    });
  }
};



