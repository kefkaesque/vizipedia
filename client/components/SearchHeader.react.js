var React = require('react');
var Router = require('react-router');
var RaceActions = require('../actions/RaceActions');
var ArticleActions = require('../actions/ArticleActions');
var SearchStore = require('../stores/SearchStore');

var SearchHeader = React.createClass({
  mixins: [ Router.Navigation ],

  getInitialState: function() {
    return {};
  },
  componentWillMount: function() {
    SearchStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    SearchStore.removeChangeListener(this._onChange);
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
  debounce: function(func, wait) {
    var timeout;
    return function() {
      var context = this;
      var args = Array.prototype.slice.apply(arguments);
      var later = function() {
        timeout = null;
        func.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  autoComplete: function() {
    var text = React.findDOMNode(this.refs.text).value.trim();
    if (text) {
      ArticleActions.dispatchHeaderComplete(text);
    } else {
      ArticleActions.dispatchClearHeader();
    }
  },
  render: function() {
    return (
      <span>
      <form className="headerForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Search..." ref="text" onKeyUp={this.debounce(this.autoComplete, 250)} />
        <button type="submit"><span className="fa fa-fw fa-search"></span></button>
      </form>
      <SearchItemsHeader topics={this.state.headerTopics}/>
      </span>
    );
  },
  _onChange: function() {
    this.setState(SearchStore.getData());
  }
});

var SearchItemsHeader = React.createClass({
  render: function() {
    if (this.props.topics) {
      var itemNodes = this.props.topics[1].map(function(item, index) {
        return (
          <li className="autocomplete-li" key={index}> {item} </li>
        );
      });
    } else {
      itemNodes = '';
    }
    return (
      <ul className="autocomplete-ul">
        {itemNodes}
      </ul>
    );
  }
});






module.exports = SearchHeader;
