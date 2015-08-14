var React = require('react');
var Article = require('./components/Article.react');
var WikiUtils = require('./utils/WikiUtils');

// eventually the client will call this
WikiUtils.getArticleData();

React.render(
  <Article />,
  document.getElementById('article')
);
