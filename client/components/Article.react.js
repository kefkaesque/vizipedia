var React = require('react');
var ArticleStore = require('../stores/ArticleStore');
var WikiUtils = require('../utils/WikiUtils');
var Recommend = require('./Recommend.react');
var RecUtils = require('../utils/RecUtils');
var Loader = require('react-loader');

function getArticleState() {
  return {
    data: ArticleStore.getData(),
    loaded: true
  };
}

var Article = React.createClass({

  getInitialState: function() {
    console.log('article getInitialState!!')
    return {data: '', loaded: false};
  },
  componentDidMount: function() {
    console.log('article componentDidMount!!')
    ArticleStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    ArticleStore.removeChangeListener(this._onChange);
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
          <div dangerouslySetInnerHTML={{__html: this.state.data.content}} />
          </div>
        </Loader>
      </div>
    );
  },
  _onChange: function() {
    this.setState(getArticleState());
  }
});

module.exports = Article;
