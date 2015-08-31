var React = require('react');
var ArticleStore = require('../stores/ArticleStore');
var Recommend = require('./Recommend.react');
var Loader = require('./Loader.react');
var ArticleActions = require('../actions/ArticleActions');
var $ = require('jquery');
var Router = require('react-router');
var Haiku = require('./404.react');

var Article = React.createClass({
  mixins: [ Router.Navigation ],

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
  parseDom: function() {
    var article = this;
    $("a[href^='/wiki']")
       .each(function()
       {
          article.convertToTransition($(this));
       });
  },
  convertToTransition: function(link) {
    var article = this;
    link.unbind().on('click', function(event) {
      event.preventDefault();

      var currentLink = link.attr('href');
      var query = currentLink.split('/')[2];
      article.transitionTo('wiki', {topic: query});
    });
  },
  render: function() {
    return (
      <div className="filled">
        <Loader loaded={this.state.loaded}>
          <Haiku user={this.state}>
          <div className="wrapper article serif">
            <Recommend info={this.state.data}/>
            <div dangerouslySetInnerHTML={this.createMarkup()} />
          </div>
          </Haiku>
        </Loader>
      </div>
    );
  },
  _onChange: function() {
    this.setState({
      data: ArticleStore.getData(),
      loaded: true
    });

    this.parseDom();
  }
});

module.exports = Article;
