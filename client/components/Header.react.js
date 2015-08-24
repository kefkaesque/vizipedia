var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Search = require('./Search.react');
var RaceActions = require('../actions/RaceActions');

var Header = React.createClass({
  handleClick: function() {
    RaceActions.cancelRace();
  },
  render: function() {
    return (
      <div className="filled"><div className="header">
        <div className="menu">
          <LoginButton/>
          <SignupButton/>
        </div>
        <Link to="landing"><div className="logo serif" onClick={this.handleClick}>vizipedia</div></Link>
        <Search />
      </div></div>
    )
  }
});

var LoginButton = React.createClass({
  render: function() {
    return (
      <a href='/login'>
        <div className="item">
          Login
        </div>
      </a>
    );
  }
});

var SignupButton = React.createClass({
  render: function() {
    return (
      <a href='/signup'>
        <div className="item">
          Sign Up
        </div>
      </a>
    );
  }
});

module.exports = Header;
