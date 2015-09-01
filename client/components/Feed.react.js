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
        <div className="hax"/>
        <h1>Recent Events</h1>
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
          <Link to="profile" params={{username: activity.username}}>
            {activity.username}
          </Link>
            <span> recommended </span>
          <Link to="wiki" params={{topic: activity.title}}>
            {activity.title.replace(/_/g, ' ')}
          </Link>
            <div> {activity.createdAt}</div>
          </div>
        )};
        if (activity.follower) {
        return (
          <div>
          <Link to="profile" params={{username: activity.follower}}>
            {activity.follower}
          </Link>
            <span> followed </span>
          <Link to="profile" params={{username: activity.following}}>
            {activity.following}
          </Link>
            <div> {activity.createdAt}</div>
          </div>
        )};
        if (activity.racer) {
        return (
          <div>
          <Link to="profile" params={{username: activity.racer}}>
            {activity.racer}
          </Link>
            <span> raced </span>
          <Link to="race" params={{raceId: activity.raceId}}>
            from {activity.start} to {activity.end} in {activity.finishTime} seconds
          </Link>
            <div> {activity.createdAt}</div>
          </div>
        )};
        if (activity.name) {
        return (
          <div>
          <Link to="profile" params={{username: activity.username}}>
            {activity.username} created playlist {activity.name}
          </Link>
          <div>
            {activity.createdAt}
          </div>
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
