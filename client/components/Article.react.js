var React = require('react');
var ArticleStore = require('../stores/ArticleStore');
var Recommend = require('./Recommend.react');
var Loader = require('./Loader.react');
var ArticleActions = require('../actions/ArticleActions');

var Article = React.createClass({

  getInitialState: function() {
    return {data: '', loaded: false};
  },
  componentWillMount: function() {
    ArticleStore.addChangeListener(this._onChange);
  },
  componentDidMount: function() {
    var query = window.location.pathname.split('/')[2];
    ArticleActions.dispatchArticle(query);
  },
  componentWillReceiveProps: function() {
    this.setState({
      data: '',
      loaded: false
    });
    var query = window.location.pathname.split('/')[2];
    ArticleActions.dispatchArticle(query);
  },
  componentWillUnmount: function() {
    ArticleStore.removeChangeListener(this._onChange);
  },
  createMarkup: function() {
    return {__html: this.state.data.content};
  },
  render: function() {
    return (
      <div className="filled">
        <Loader loaded={this.state.loaded}>
          <div className="wrapper article serif">
            <Recommend info={this.state.data}/>
            <div dangerouslySetInnerHTML={this.createMarkup()} />
          </div>
        </Loader>
      </div>
    );
  },
  _onChange: function() {
    this.setState({
      data: ArticleStore.getData(),
      loaded: true
    });
  }
});

module.exports = Article;
