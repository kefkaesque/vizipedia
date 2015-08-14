var React = require('react');
var Profile = require('./components/Profile.react');
var ProfileUtils = require('./utils/ProfileUtils');

// eventually the client will call this
ProfileUtils.getProfileData();

React.render(
  <Profile />,
  document.getElementById('profile')
);
