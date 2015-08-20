var React = require('react');
var RecommendStore = require('../stores/RecommendStore');
var RecActions = require('../actions/RecActions');

var RecommendButton = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
    RecommendStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    RecommendStore.removeChangeListener(this._onChange);
  },
  handlePress: function(articleId) {
    RecActions.dispatchRec(articleId);
  },
  render: function() {
    return (
      <div className="item">
        <button className="recommend" onClick={this.handlePress.bind(this, this.props.articleId)}>
        Recommend
        </button>
        <span className="rCount"></span>
      </div>
    );
  },
  _onChange: function() {
    this.setState(RecommendStore.getData());
  }
});

module.exports = RecommendButton;
