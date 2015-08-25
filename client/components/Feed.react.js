var React = require('react');
var FeedStore = require('../stores/FeedStore');
var FeedActions = require('../actions/FeedActions');
var Router = require('react-router');
var Link = Router.Link;

var Feed = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
    FeedActions.dispatchFeedData();
    FeedStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    FeedStore.removeChangeListener(this._onChange);
  },
  render: function() {
    return (
      <div>
        <h1> FEED DATA </h1>
          <h3>Recommended Articles</h3>
          <FollowingUsers articles={this.state.data}/>
      </div>
    );
  },
        // <div> {this.state} </div>
  _onChange: function() {
    console.log('feed data',FeedStore.getData())
    // this.setState(getFeedState());
    this.setState(
      FeedStore.getData()
    );
  }
});

var FollowingUsers = React.createClass({

  render: function() {
    console.log('FollowingUsers this.props',this.props)
    if(this.props.articles){
      var articles = this.props.articles.map(function(article, index) {
        return (
          <div>
          <Link to="wiki" params={{topic: article.title}}>
            {article.username} recommended {article.title} {article.createdAt}
          </Link>
          </div>
        );
      });
    }
    return (
      <div className="follower section">
        <div className="container">
          {articles}
        </div>
      </div>
    )
  }
});

// var RecItem = React.createClass({

//   render: function() {
//     var articles = this.props.articles.map(function(article, index) {
//       return (
//         <div>
//           <Link to="wiki" params={{topic: article}}>
//             {article}
//           </Link>
//         </div>
//       );
//     });

//     return (
//       <div className="box">
//         {articles}
//       </div>
//     );
//   }
// });




module.exports = Feed;
