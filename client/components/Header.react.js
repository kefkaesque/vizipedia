var React = require('react');
var WikiUtils = require('../utils/WikiUtils');
var Router = require('react-router');

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
      <div className="item">
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
      <div className="item">
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
        <button type="submit"><span className="fa fa-search"></span></button>
      </form>
    );
  }
});

module.exports = Header;
