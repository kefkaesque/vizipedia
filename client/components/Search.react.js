var React = require('react');
var Router = require('react-router');
var RaceActions = require('../actions/RaceActions');

var Search = React.createClass({
  mixins: [ Router.Navigation ],

  handleSubmit: function(e) {
    e.preventDefault();
    var text = React.findDOMNode(this.refs.text).value.trim();
    if (!text) {
      return;
    }
    RaceActions.cancelRace();
    if (text.substr(0,5) === 'user:') {
      text = text.substr(5).trim();
      if (!text) {
        return;
      }
      this.transitionTo('profile', {username: text});
    } else {
      this.transitionTo('wiki', {topic: text});
    }
    React.findDOMNode(this.refs.text).value = '';
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

module.exports = Search;
