var React = require('react');
var RecommendStore = require('../stores/RecommendStore');
var RecActions = require('../actions/RecActions');

var RecommendButton = React.createClass({
  flag: false,
  flag2: false,
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
    RecActions.dispatchArticleRecs(this.props.info.id);
    RecActions.dispatchRecState(this.props.info.id, this.props.info.id);
    RecommendStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    RecommendStore.removeChangeListener(this._onChange);
  },
  handleButton: function(articleId) {
    if (this.flag) {
      return;
    }
    this.flag = true;
    if (this.flag2) {
      RecActions.dispatchUnrec(articleId)
    } else {
      RecActions.dispatchRec(articleId)
    }
    //RecActions.dispatchRecState(this.props.info.id, this.props.info.id);
  },

  render: function() {
    return (
      <div className="item">
        <button className="recommend" disabled={this.flag} onClick={this.handleButton.bind(this, this.props.info.id)}>
        Recommend
        <span>{this.state.num}</span>
        </button>
      </div>
    );
  },
  _onChange: function() {
    this.flag = false;
    this.flag2 = !this.flag2;
    this.setState(RecommendStore.getData());
  }
});

module.exports = RecommendButton;
