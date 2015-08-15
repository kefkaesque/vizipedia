var React = require('react');
var WikiUtils = require('../utils/WikiUtils');
var Router = require('react-router');

var Landing = React.createClass({
  render() {
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
        <input type="text" placeholder="Search..." ref="text" />
        <button type="submit"><span className="fa fa-fw fa-search"></span></button>
      </form>
    );
  }
});
