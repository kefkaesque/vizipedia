var React = require('react');
var RecUtils = require('../utils/RecUtils');
var ArticleStore = require('../stores/ArticleStore');

function getRecommendState() {
  console.log('getting recommended state');
  return {
    data: ArticleStore.getData(),
  };
}

var RecommendButton = React.createClass({
  getInitialState: function() {
    return getRecommendState();
  },
  componentDidMount: function() {
    ArticleStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    ArticleStore.removeChangeListener(this._onChange);
  },
  handlePress: function(articleId) {
    RecUtils.getRecData(articleId);
  },
  render: function() {
    return (
      <div className="item">
        <button className="recommend" onClick={this.handlePress.bind(this, this.state.data.id)}>
        Recommend {this.state.data.recs}
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
