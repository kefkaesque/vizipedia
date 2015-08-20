var React = require('react');
var ArticleStore = require('../stores/ArticleStore');
var Recommend = require('./Recommend.react');
var Loader = require('react-loader');
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
        <Loader loaded={this.state.loaded} lines={13} length={30} width={15} radius={80}
        corners={1} rotate={0} direction={1} color="#000" speed={1}
        trail={60} shadow={false} hwaccel={false} className="spinner"
        zIndex={2e9} top="50%" left="50%" scale={1.00} >
          <div className="wrapper article serif">
            <Recommend articleId={this.state.data.id} />
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
