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
      <div className="feed wrapper">
        <h1> FEED DATA </h1>
          <h3>Following Activities</h3>
          <FollowingUsers activities={this.state.data}/>
      </div>
    );
  },
  _onChange: function() {
    this.setState(
      FeedStore.getData()
    );
  }
});

var FollowingUsers = React.createClass({

  render: function() {
    if(this.props.activities){
      var activities = this.props.activities.map(function(activity, index) {
        if (activity.title) {
        return (
          <div>
          <Link to="wiki" params={{topic: activity.title}}>
            {activity.username} recommended {activity.title} {activity.createdAt}
          </Link>
          </div>
        )};
        if (activity.follower) {
        return (
          <div>
          <Link to="profile" params={{username: activity.following}}>
            {activity.follower} followed {activity.following} {activity.createdAt}
          </Link>
          </div>
        )};
        if (activity.racer) {
        return (
          <div>
          <Link to="race" params={{raceId: activity.raceId}}>
            {activity.racer} played Wiki race start:{activity.start} end:{activity.end} {activity.createdAt}
          </Link>
          </div>
        )};
        if (activity.name) {
        return (
          <div>
          <Link to="profile" params={{username: activity.username}}>
            {activity.username} created playlist name:{activity.name} {activity.createdAt}
          </Link>
          </div>
        )};
      });
    }
    return (
      <div className="follower section">
        <div className="container">
          {activities}
        </div>
      </div>
    )
  }
});

module.exports = Feed;
