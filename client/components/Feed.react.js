var React = require('react');
var FeedStore = require('../stores/FeedStore');
var FeedUtils = require('../utils/FeedUtils');
var Router = require('react-router');

function getFeedState() {
  return {
    data: FeedStore.getData(),
  };
}

var Feed = React.createClass({
  getInitialState: function() {
    FeedUtils.getFeedData();
    return getFeedState();
  },
  componentDidMount: function() {
    FeedStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    FeedStore.removeChangeListener(this._onChange);
  },
  render: function() {
    return (
      <div>
        <h1> FEED DATA </h1>
        <div> {this.state.data} </div>
      </div>
    );
  },
  _onChange: function() {
    this.setState(getFeedState());
  }
});

module.exports = Feed;
