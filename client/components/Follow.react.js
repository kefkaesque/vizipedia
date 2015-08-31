var React = require('react');
var ProfileActions = require('../actions/ProfileActions');

var Follow = React.createClass({

  handlePress: function(e) {
    if (!Locals.username) {
      window.location.href = "/login";
    } else {
      ProfileActions.dispatchFollow(this.props.username);
    }
  },
  render: function() {
    console.log(this.props);
    return (
      <div className="headerbutton">
        <span className="button" onClick={this.handlePress}>
          FOLLOW
        </span>
      </div>
    );
  }
});

module.exports = Follow;
