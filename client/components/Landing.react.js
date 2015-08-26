var React = require('react');
var Router = require('react-router');

var Landing = React.createClass({
  render: function() {
    return (
      <div className="splash">
        <div className="spacer"></div>
        <div>
          <div className="logo serif">vizipedia</div>
          <SearchBar />
        </div>
      </div>
    )
  }
});

module.exports = Landing;


var SearchBar = React.createClass({
  mixins: [ Router.Navigation ],

  handleSubmit: function(e) {
    e.preventDefault();
    var text = React.findDOMNode(this.refs.text).value.trim();
    if (!text) {
      return;
    }
    if (text.substr(0,5) === 'user:') {
      text = text.substr(5).trim();
      if (!text) {
        return;
      }
      this.transitionTo('profile', {username: text});
    } else {
      this.transitionTo('wiki', {topic: text});
    }
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
