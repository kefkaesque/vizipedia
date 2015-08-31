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
    return (
      <div className="headerbutton">
      {Locals.username !== this.props.username ?
          <span className="button" onClick={this.handlePress}>
            FOLLOW
          </span> :
        <div></div>
      }
      </div>
    );
  }
});

module.exports = Follow;
