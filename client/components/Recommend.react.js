var React = require('react');
var RecommendStore = require('../stores/RecommendStore');
var RecActions = require('../actions/RecActions');

var RecommendButton = React.createClass({
  disable: false,
  flag: false,
  getInitialState: function() {
    return {};
  },
  componentWillMount: function() {
    RecommendStore.addChangeListener(this._onChange);
  },
  componentDidMount: function() {
    RecActions.dispatchArticleRecs(this.props.info.id);
    RecActions.dispatchRecState(this.props.info.id, this.props.info.id);
  },
  componentWillUnmount: function() {
    RecommendStore.removeChangeListener(this._onChange);
  },
  handleButton: function(articleId) {
    this.disabled = true;
    if ((this.state.state || this.flag) && !(this.state.state && this.flag)) {
      RecActions.dispatchRec(articleId);
    } else {
      RecActions.dispatchUnrec(articleId);
    }
    //RecActions.dispatchRecState(this.props.info.id, this.props.info.id);
  },

  render: function() {
    return (
      <div className="item">
        <button className="recommend" disabled={this.disable} onClick={this.handleButton.bind(this, this.props.info.id)}>
        Recommend
        </button>
        <span>{this.state.num}</span>
      </div>
    );
  },
  _onChange: function() {
    this.disable = false;
    this.flag = !this.flag;
    this.setState(RecommendStore.getData());
  }
});

module.exports = RecommendButton;
