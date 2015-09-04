var React = require('react');
var Router = require('react-router');
var RaceActions = require('../actions/RaceActions');
var ArticleActions = require('../actions/ArticleActions');
var SearchStore = require('../stores/SearchStore');

var Search = React.createClass({
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
  autoComplete: function(e) {
    var text = React.findDOMNode(this.refs.text).value.trim();
    if (text) {
      ArticleActions.dispatchAutoComplete(text);
    } else {
      ArticleActions.dispatchClearLanding();
    }
  },
  render: function() {
    return (
      <div>
      <form className="headerForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Search..." ref="text" onKeyUp={this.debounce(this.autoComplete, 250)} />
        <button type="submit"><span className="fa fa-fw fa-search"></span></button>
      </form>
      <SearchItems topics={this.state.topics}/>
      </div>
    );
  },
  _onChange: function() {
    this.setState(SearchStore.getData());
  }
});

var SearchItems = React.createClass({
  render: function() {
    if (this.props.topics) {
      var itemNodes = this.props.topics[1].map(function(item, index) {
        return (
        <div>
          <li className="autocomplete-li" key={index}> {item} </li>
        </div>
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






module.exports = Search;
