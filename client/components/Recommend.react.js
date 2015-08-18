var React = require('react');
var RecUtils = require('../utils/RecUtils');
var RecommendStore = require('../stores/RecommendStore');

function getRecommendState() {
  console.log('getting recommended state');
  return {
    data: RecommendStore.getData(),
  };
}

var RecommendButton = React.createClass({
  getInitialState: function() {
    console.log('initial', this.props.articleId);
    return getRecommendState();
  },
  componentDidMount: function() {
    RecommendStore.addChangeListener(this._onChange);
    console.log('didmount', this.props);
  },
  componentDidUpdate: function() {
    // RecUtils.getRecData(articleId);

    console.log('didupdate', this.props);
  },
  componentWillReceiveProps: function() {
    console.log('willreceive', this.props);
  },
  componentWillUnmount: function() {
    console.log('willunmount', this.props.articleId);
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
