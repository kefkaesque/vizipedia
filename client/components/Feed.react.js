var React = require('react');
var FeedStore = require('../stores/FeedStore');
var WikiUtils = require('../utils/WikiUtils');


function getFeedState() {
  return {
    data: FeedStore.getData(),
  };
}

var Feed = React.createClass({

  getInitialState: function() {
    getFeedState();
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
        Feed
      </div>
    );
  },
  _onChange: function() {
    this.setState(getFeedState());
  }
});

module.exports = Feed;
