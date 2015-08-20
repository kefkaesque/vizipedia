var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Header = React.createClass({

  render: function() {
    return (
      <div className="filled"><div className="header">
        <div className="menu">
          <LoginButton/>
          <SignupButton/>
        </div>
        <div className="logo serif">vizipedia</div>
        <HeaderForm />
        <UserSearch />
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

var HeaderForm = React.createClass({
  mixins: [ Router.Navigation ],

  handleSubmit: function(e) {
    e.preventDefault();
    var text = React.findDOMNode(this.refs.text).value.trim();
    if (!text) {
      return;
    }
    this.transitionTo('wiki', {topic: text});
    return;
  },
  render: function() {
    return (
      <form className="headerForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Search..." ref="text" />
        <button type="submit"><span className="fa fa-fw fa-search"></span></button>
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
    this.transitionTo('profile', {username: text});
    React.findDOMNode(this.refs.text).value = '';
    return;
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
