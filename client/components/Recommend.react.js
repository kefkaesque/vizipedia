var React = require('react');
var RecommendStore = require('../stores/RecommendStore');
var RecUtils = require('../utils/RecUtils');

function getRecommendState() {
  return {
    data: RecommendStore.getData(),
  };
}

var RecommendButton = React.createClass({
  getInitialState: function() {
    return getRecommendState();
  },
  componentDidMount: function() {
    RecommendStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    RecommendStore.removeChangeListener(this._onChange);
  },
  handlePress: function(e) {
    console.log('rec Pressed!');
    RecUtils.getRecData();
    // create an action
  },
  render: function() {
    return (
      <div className="item">
        <button className="recommend" onClick={this.handlePress}>
        Recommend
        </button>
        <span className="rCount"></span>
      </div>
    );
  },
  _onChange: function() {
    this.setState(getRecommendState());
  }
});

module.exports = RecommendButton;
