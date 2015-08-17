var React = require('react');
var WikiUtils = require('../utils/WikiUtils');
var ProfileUtils = require('../utils/ProfileUtils');
var Router = require('react-router');
var Link = Router.Link;

var Header = React.createClass({

  render: function() {
    return (
      <div className="header">
        <div className="menu">
          <LoginButton/>
          <SignupButton/>
        </div>
        <div className="logo serif">vizipedia</div>
        <HeaderForm />
        <UserSearch />
      </div>
    )
  }
});

var LoginButton = React.createClass({
  render: function() {
    return (
      <div className="item">
        <a href='/login'>
          Login
        </a>
      </div>
    );
  }
});

var SignupButton = React.createClass({
  render: function() {
    return (
      <div className="item">
        <a href='/signup'>
          Signup
        </a>
      </div>
    );
  }
});

var HeaderForm = React.createClass({
  mixins: [ Router.Navigation ],

  handleSubmit: function(e) {
    e.preventDefault();
    var text = React.findDOMNode(this.refs.text).value.trim();// get the value

    if (!text) {
      return;
    }

    WikiUtils.getArticleData(text);
    React.findDOMNode(this.refs.text).value = '';// clean the value
    this.transitionTo('wiki', {topic: text});
  },
  render: function() {
    return (
      <form className="headerForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Search Articles" ref="text" />
        <button type="submit"><span className="fa fa-search"></span></button>
      </form>
    );
  }
});

var UserSearch = React.createClass({
  mixins: [ Router.Navigation ],

  handleSubmit: function(e) {
    e.preventDefault();
    var text = React.findDOMNode(this.refs.text).value.trim();

    if (!text) {
      return;
    }

    var goProfile = (function(data) {
      this.transitionTo('profile', {username: text});
    }).bind(this);

    ProfileUtils.getProfileData(text, goProfile);
    React.findDOMNode(this.refs.text).value = '';

  },
  render: function() {
    return (
      <form className="headerForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Search Users" ref="text" />
        <button type="submit"><span className="fa fa-search"></span></button>
      </form>
    );
  }
});

module.exports = Header;
