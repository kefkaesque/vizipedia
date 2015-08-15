var React = require('react');
var WikiUtils = require('../utils/WikiUtils');
var Router = require('react-router');

var Landing = React.createClass({
  render() {
    return (
      <div>
        <h1>Landing</h1>
        <SearchBar />
      </div>
    )
  }
});

module.exports = Landing;


var SearchBar = React.createClass({
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
