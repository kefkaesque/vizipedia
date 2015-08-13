var React = require('react');
var ArticleStore = require('../stores/ArticleStore');

function getArticleState() {
  return {
    data: ArticleStore.loadData(),
  };
}

var FluxCartApp = React.createClass({

  getInitialState: function() {
    return getArticleState();
  },
  componentDidMount: function() {
    ArticleStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    ArticleStore.removeChangeListener(this._onChange);
  },

  // Render our child components, passing state via props
  render: function() {
    return (
      <div className="article">
        <h1>hello</h1>
      </div>
    );
  },

  // Method to setState based upon Store changes
  _onChange: function() {
    this.setState(getArticleState());
  }

});

module.exports = FluxCartApp;
