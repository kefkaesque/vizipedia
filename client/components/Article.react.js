var React = require('react');
var ArticleStore = require('../stores/ArticleStore');
var WikiUtils = require('../utils/WikiUtils');
var Recommend = require('./Recommend.react');


function getArticleState() {
  return {
    data: ArticleStore.getData(),
  };
}

var Article = React.createClass({

  getInitialState: function() {
    return {data: ''};
  },
  componentDidMount: function() {
    ArticleStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    ArticleStore.removeChangeListener(this._onChange);
  },
  render: function() {
    return (
      <div className="filled">
        <div className="wrapper article serif">
        <Recommend />
        <div dangerouslySetInnerHTML={{__html: this.state.data.content}} />
        </div>
      </div>
    );
  },
  _onChange: function() {
    this.setState(getArticleState());
  }
});

module.exports = Article;
