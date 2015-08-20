var React = require('react');
var RecommendStore = require('../stores/RecommendStore');
var RecActions = require('../actions/RecActions');

var RecommendButton = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
    RecActions.dispatchArticleRecs(this.props.articleId);
    RecommendStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    RecommendStore.removeChangeListener(this._onChange);
  },
  handleRecommend: function(articleId) {
    RecActions.dispatchRec(articleId);
  },
  render: function() {
    return (
      <div className="item">
        <button className="recommend" onClick={this.handleRecommend.bind(this, this.props.articleId)}>
        Recommend {this.state.num}
        </button>
      </div>
    );
  },
  _onChange: function() {
    this.setState(RecommendStore.getData());
  }
});

module.exports = RecommendButton;
