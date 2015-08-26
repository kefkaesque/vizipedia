var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var RaceActions = require('../actions/RaceActions');
var Search = require('./Search.react');

var Header = React.createClass({
  render: function() {
    return (
      <div className="filled"><div className="header">
        <div className="menu">
          <LoginButton/>
          <SignupButton/>
          <FeedButton/>
        </div>
        <Link to="landing"><div className="logo serif">vizipedia</div></Link>
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
          Signup
        </div>
      </a>
    );
  }
});

var FeedButton = React.createClass({
  mixins: [ Router.Navigation ],

  handleClick: function(e) {
    e.preventDefault();
    this.transitionTo('feed');
    return;
  },
  render: function() {
    return (
      <div className="item">
        <button onClick={this.handleClick}>
          Feed
        </button>
      </div>
    );
  }
});

module.exports = Header;
