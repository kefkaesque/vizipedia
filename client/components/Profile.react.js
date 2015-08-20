var React = require('react');
var ProfileStore = require('../stores/ProfileStore');
var Recommend = require('./Recommend.react');
var ProfileActions = require('../actions/ProfileActions');
var Router = require('react-router');
var Link = Router.Link;
var RaceActions = require('../actions/RaceActions');

var Profile = React.createClass({

  getInitialState: function() {
    return {};
  },
  componentWillMount: function() {
    ProfileStore.addChangeListener(this._onChange);
  },
  componentDidMount: function() {
    var query = window.location.pathname.split('/')[2];
    ProfileActions.dispatchProfileData(query);
  },
  componentWillReceiveProps: function() {
    var query = window.location.pathname.split('/')[2];
    ProfileActions.dispatchProfileData(query);
  },
  componentWillUnmount: function() {
    ProfileStore.removeChangeListener(this._onChange);
  },
  render: function() {
    return (
      <div className="profile">
        <ProfileHeader data={this.state}/>
        <UserInfo data={this.state} numArticle={this.state.numArticle}/>
        <div className="profile__row">
          <RecommendedArticles />
          <CommentsMade />
        </div>
        <div className="profile__row">
          <Playlists username={this.state.username} playlists={this.state.playlists} />
          <RaceButton/>
        </div>
      </div>
    )
  },
  _onChange: function() {
    this.setState(
      ProfileStore.getData()
    );
  }
});

var ProfileHeader = React.createClass({

  render: function() {
    var followButton ='';
    if(Locals.username && Locals.username !== this.props.data.username){
      followButton = (<FollowButton username={this.props.data.username}/>);
    }
    return (
      <div className="profileheader">
        <h1>{this.props.data.username}</h1>
          {followButton}
      </div>
    )
  }
});

var UserInfo = React.createClass({

  render: function() {
    return (
      <div className="profile__row">
        <div className="profile__item">Followed by {this.props.data.followedBy}</div>
        <div className="profile__item">Following {this.props.data.following}</div>
        <div className="profile__item">Articles Read : {this.props.numArticle}</div>
      </div>
    )
  }
});

var RecommendedArticles = React.createClass({

  render: function() {
    return (
      <div className="recommended profile__item">
        <h3>Recommended Articles</h3>
        <ul>
          <li>Dog</li>
          <li>Cat</li>
          <li>San Francisco</li>
        </ul>
      </div>
    )
  }
});

var CommentsMade = React.createClass({

  render: function() {
    return (
      <div className="commentsMade profile__item">
        <h3>Comments Made</h3>
        <ul>
          <li>
            <span>carterchung commented on article "Morocco"</span>
            <p>Great description of the city. I had no idea!</p>
          </li>
        </ul>
      </div>
    )
  }
});

var Playlists = React.createClass({
  render: function() {
    var createLink = '';
    if(Locals.username===this.props.username){
      createLink = (<Link to="createPlaylist">{' + Create New Playlist'}</Link>);
    }

    var itemNodes;
    if(this.props.playlists){
      itemNodes = this.props.playlists.map(function(list, index) {
        return (
          <PlaylistItem name={list.name} key={index} />
        );
      });
    }

    return (
      <div className="playlists profile__item">
        <h3>Playlists</h3>
        <div>
          {createLink}
        </div>
        {itemNodes}
      </div>
    )
  }
});

var PlaylistItem = React.createClass({
  render: function() {
    return (
      <div className="playlistItem">
        {this.props.name}
      </div>
    );
  }
});

var FollowButton = React.createClass({
  handlePress: function(e) {
    ProfileActions.dispatchFollow(this.props.username);
  },
  render: function() {
    return (
      <div className="followButton">
        <button onClick={this.handlePress}>
          Follow
        </button>
      </div>
    );
  }
});

var RaceButton = React.createClass({
  mixins: [ Router.Navigation ],

  handlePress: function(e) {
    RaceActions.dispatchRacing({
      racing:true,
      start: 2, //article id for cat in my db
      end: 8, //article id for dog in my db
    });
    this.transitionTo('wiki', {topic: 'Cat'}); //hardcoded in...should get from article id

  },
  render: function() {
    return (
      <div className="raceButton profile__item">
        <button onClick={this.handlePress}>
          Race!
        </button>
      </div>
    );
  }
});

module.exports = Profile;
