var React = require('react');
var WikiUtils = require('../utils/WikiUtils');
var Router = require('react-router');

var Header = React.createClass({

  render: function() {
    return (
      <div className="header">
        <h1>Header</h1>
        <div className="logo">vizipedia</div>
        <HeaderForm />
        <div className="menu">
          <LoginButton/>
          <SignupButton/>
        </div>
      </div>
    )
  }
});

var LoginButton = React.createClass({
  handlePress: function(e) {
    console.log('Login Pressed!')
  },
  render: function() {
    return (
      <div className="loginButton">
        <button onClick={this.handlePress}>
          Login
        </button>
      </div>
    );
  }
});

var SignupButton = React.createClass({
  handlePress: function(e) {
    console.log('Signup Pressed!')

  },
  render: function() {
    return (
      <div className="signupButton">
        <button onClick={this.handlePress}>
          Signup
        </button>
      </div>
    );
  }
});

var HeaderForm = React.createClass({
  mixins: [ Router.Navigation ],

  handleSubmit: function(e) {
    console.log('Submit Search!')
    e.preventDefault();
    var text = React.findDOMNode(this.refs.text).value.trim();// get the vaule
    WikiUtils.getArticleData(text);
    if (!text) {
      return;
    }
    React.findDOMNode(this.refs.text).value = '';// clean the vaule
    this.transitionTo('wiki', {topic: text});
    return;
  },
  render: function() {
    return (
      <form className="headerForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Search Articles" ref="text" />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

module.exports = Header;
