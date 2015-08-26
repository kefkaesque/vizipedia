var React = require('react');
var RecommendStore = require('../stores/RecommendStore');
var RecActions = require('../actions/RecActions');

var RecommendButton = React.createClass({

  disable: false,
  getInitialState: function() {
    return {};
  },
  componentWillMount: function() {
    RecommendStore.addChangeListener(this._onChange);
  },
  componentDidMount: function() {
    RecActions.dispatchArticleRecs(this.props.info.id);
    if (Locals.userid) {
      RecActions.dispatchRecState(Locals.userid, this.props.info.id);
    }
  },
  componentWillUnmount: function() {
    RecommendStore.removeChangeListener(this._onChange);
  },
  handleButton: function(articleId) {
    this.disabled = true;
    if (!Locals.userid) {
      window.location.href= '/login';
    } else {
      if (this.state.state) {
        RecActions.dispatchUnrec(articleId);
      } else {
        RecActions.dispatchRec(articleId);
      }
    }
  },
  render: function() {
    return (
      <div className="item">
        <Heart className="recommend" disabled={this.disable} state={this.state} click={this.handleButton.bind(this, this.props.info.id)}/>
        <span>{this.state.num}</span>
      </div>
    );
  },
  _onChange: function() {
    this.disable = false;
    this.setState(RecommendStore.getData());
  }
});

var Heart = React.createClass({
  getInitialState: function() {
    return {
      classes: 'heart',
    }
  },
  getClasses: function() {
    if (this.props.state.state) {
      return this.state.classes + ' filled';
    } else {
      return this.state.classes + ' empty';
    }
  },
  handleClick: function() {

  },
  render: function() {
    var classNames = this.getClasses();
    return React.DOM.svg({
      className: classNames,
      viewBox: "-5 0 69 64",
      onClick: this.props.click
    }, [
      React.DOM.path({
        d: "M30.3,57.8L8.7,37c-0.3-0.2-7.9-7.2-7.9-15.5C0.8,11.3,7,5.2,17.3,5.2c6.1,0,11.7,4.8,14.5,7.5c2.7-2.7,8.4-7.5,14.5-7.5   c10.4,0,16.6,6.1,16.6,16.2c0,8.3-7.6,15.3-7.9,15.6L33.3,57.8c-0.4,0.4-1,0.6-1.5,0.6C31.3,58.4,30.7,58.2,30.3,57.8z"
      })
    ]);
  }
});

module.exports = RecommendButton;
