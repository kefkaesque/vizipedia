var React = require('react');
var ProfileStore = require('../stores/ProfileStore');
var Recommend = require('./Recommend.react');
var ProfileActions = require('../actions/ProfileActions');
var Router = require('react-router');
var Link = Router.Link;
var RaceActions = require('../actions/RaceActions');
var RecommendStore = require('../stores/RecommendStore');
var RecActions = require('../actions/RecActions');


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
      <div className="profile wrapper">
        <ProfileHeader data={this.state}/>
          <RecommendedArticles/>
          <CommentsMade />
          <Playlists username={this.state.username} playlists={this.state.playlists} />
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
    // var followButton ='';
    // if(Locals.username && Locals.username !== this.props.data.username){
    //   followButton = (<FollowButton username={this.props.data.username}/>);
    // }

    return (
      <div className="profileheader">
        <div className="row">
          <div className="username item">
            {this.props.data.username}
          </div>
        </div>
        <div className="info row">
          <div className="item">
            <p>FOLLOWERS</p>
            <p className="stat">{this.props.data.followedBy}</p>
          </div>
          <div className="item">
            <p>FOLLOWING</p>
            <p className="stat">{this.props.data.following}</p>
          </div>
          <div className="item">
            <p>ARTICLES READ</p>
            <p className="stat">{this.props.data.numArticle}</p>
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="item">
            <FollowButton username={this.props.data.username}/>
          </div>
          <div className="item">
            <RaceButton/>
          </div>
        </div>
      </div>
    )
  }
});

var RecommendedArticles = React.createClass({
  getInitialState: function() {
    return {}
  },
  componentWillMount: function() {
    RecommendStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    RecommendStore.removeChangeListener(this._onChange);
  },
  render: function() {
    if (this.state.userRec) {
      var itemNodes = this.state.userRec.map(function(item, index) {
        return (
         <RecItem article={item.wikiarticle} key={index} />
        );
      });
    } else {
      itemNodes = '';
    }
    return (
      <div className="recommended section">
        <h3>Recommended</h3>
        <div className="container">
          {itemNodes}
        </div>
      </div>
    )
  },
  _onChange: function() {
    this.setState(
      RecommendStore.getData()
    );
  }
});

var RecItem = React.createClass({
  render: function() {
    return (
      <div className="box">
        {this.props.article.title}
      </div>
    );
  }
});

var CommentsMade = React.createClass({

  render: function() {
    return (
      <div className="commentsMade section">
        <h3>Comments</h3>
        <div className="container">
          <div className="sky box">
            Sky
          </div>
          <div className="cat box">
            Cat
          </div>
          <div className="niagara box">
            Niagara Falls
          </div>
          <div className="sound box">
            Sound of Music
          </div>
        </div>
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
    var username = this.props.username;
    var itemNodes;
    console.log('this.props:',this.props)
    if(this.props.playlists){
      itemNodes = this.props.playlists.map(function(list, index) {
        console.log('list:', username);
        return (
          <div>
          <Link to="playlistItems" params={{playlistName: list.name}} query={{ playlistId: list.id, userId: list.userId, username: username }}>
            <PlaylistItem name={list.name} key={index} />
          </Link>
          <br/>
          </div>
        );
      });
    }

    return (
      <div className="playlists section">
        <h3>Playlists</h3>
        <div>
          {createLink}
        </div>
        <div className="container">
          {itemNodes}
        </div>
      </div>
    )
  }
});

var PlaylistItem = React.createClass({
  handlePress: function(e) {
    console.log('PlaylistItem clicked!!!!!')
  },
  render: function() {
    return (
      <div className="playlistItem box">
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
      <div className="headerbutton">
        <span className="button" onClick={this.handlePress}>
          FOLLOW
        </span>
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
      <div className="headerbutton">
        <span className="button" onClick={this.handlePress}>
          RACE!
        </span>
      </div>
    );
  }
});

module.exports = Profile;
