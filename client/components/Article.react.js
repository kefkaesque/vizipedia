var React = require('react');
var ArticleStore = require('../stores/ArticleStore');
var WikiUtils = require('../utils/WikiUtils');


function getArticleState() {
  return {
    data: ArticleStore.getData(),
  };
}

var Article = React.createClass({

  getInitialState: function() {
    WikiUtils.getArticleData();
    return getArticleState();
  },
  componentDidMount: function() {
    ArticleStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    ArticleStore.removeChangeListener(this._onChange);
  },
  render: function() {
    return (
      <div>
        {this.state.data}
      </div>
    );
  },
  _onChange: function() {
    this.setState(getArticleState());
  }
});

module.exports = Article;
