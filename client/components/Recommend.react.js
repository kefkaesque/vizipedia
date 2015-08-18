var React = require('react');
var RecUtils = require('../utils/RecUtils');
var RecommendStore = require('../stores/RecommendStore');
var ArticleStore = require('../stores/ArticleStore');

function getRecommendState() {
  console.log('getting recommended state');
  return {
    data: RecommendStore.getData(),
  };
}

var RecommendButton = React.createClass({
  getInitialState: function() {
    var data = ArticleStore.getData();
    RecUtils.getRecData(data.id);
    return getRecommendState();
  },
  componentDidMount: function() {
    RecommendStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    RecommendStore.removeChangeListener(this._onChange);
  },
  handlePress: function(articleId) {
    RecUtils.getRecData(articleId);
  },
  render: function() {
    return (
      <div className="item">
        <button className="recommend" onClick={this.handlePress.bind(this, this.props.articleId)}>
        Recommend {this.state.data}
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
