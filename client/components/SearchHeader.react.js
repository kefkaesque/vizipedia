var React = require('react');
var Router = require('react-router');
var RaceActions = require('../actions/RaceActions');
var ArticleActions = require('../actions/ArticleActions');
var ArticleStore = require('../stores/ArticleStore');

var SearchHeader = React.createClass({
  mixins: [ Router.Navigation ],

  getInitialState: function() {
    return {};
  },
  componentWillMount: function() {
    ArticleStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    ArticleStore.removeChangeListener(this._onChange);
  },
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
  autoComplete: function(e) {
    var text = React.findDOMNode(this.refs.text).value.trim();
    ArticleActions.dispatchHeaderComplete(text);
  },
  render: function() {
    return (
      <span>
      <form className="headerForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Search..." ref="text" onKeyUp={this.autoComplete} />
        <button type="submit"><span className="fa fa-fw fa-search"></span></button>
      </form>
      <SearchItemsHeader topics={this.state.headerTopics}/>
      </span>
    );
  },
  _onChange: function() {
    this.setState(ArticleStore.getData());
  }
});

var SearchItemsHeader = React.createClass({
  render: function() {
    if (this.props.topics) {
      var itemNodes = this.props.topics[1].map(function(item, index) {
        return (
          <span key={index}>
            <span> {item} </span>
          </span>
        );
      });
    } else {
      itemNodes = '';
    }
    return (
      <div>
        {itemNodes}
      </div>
    );
  }
});






module.exports = SearchHeader;
