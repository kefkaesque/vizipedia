var React = require('react');
var ProfileStore = require('../stores/ProfileStore');
var ProfileUtils = require('../utils/ProfileUtils');
var Router = require('react-router');
var Link = Router.Link;

function getProfileState() {
  console.log('profile.react.js getting profile state');
  return {
    data: ProfileStore.getData(),
  };
}


var Profile = React.createClass({
  getInitialState: function() {
     return getProfileState();
  },
  componentDidMount: function() {
    ProfileStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    ProfileStore.removeChangeListener(this._onChange);
  },
  render: function() {
    return (
      <div className="mainProfile">
        <ProfileHeader data={this.state.data}/>
        <ReadCompletion numArticle={this.state.data.numArticle}/>
        <RecommendedArticles />
        <CommentsMade />
        <Playlists username={this.state.data.username}/>
        <FollowButton username={this.state.data.username}/>
      </div>
    )
  },
  _onChange: function() {
    this.setState(getProfileState());
  }
});

var ProfileHeader = React.createClass({

  render: function() {
    return (
      <div className="profileheader">
        <h1>{this.props.data.username}</h1>
        <h2>Followed by {this.props.data.followedBy}</h2>
        <h2>Following {this.props.data.following}</h2>
      </div>
    )
  }
});

var ReadCompletion = React.createClass({

  render: function() {
    return (
      <div className="completion">
        <p>Number of Articles Completed : {this.props.numArticle}</p>
      </div>
    )
  }
});

var RecommendedArticles = React.createClass({

  render: function() {
    return (
      <div className="recommended">
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
      <div className="commentsMade">
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
    return (
      <div className="playlists">
        <h3>Playlists</h3>
        <div>
          {createLink}
        </div>
        <ul>
          <li>Data Structures</li>
          <li>Road trip to NYC</li>
        </ul>
      </div>
    )
  }
});

var FollowButton = React.createClass({
  handlePress: function(e) {
    console.log('FollowButton Pressed!',this.props.username)
    ProfileUtils.postProfileData(this.props.username);
  },
  render: function() {
    return (
      <div className="item">
        <button onClick={this.handlePress}>
          Follow 
        </button>
      </div>
    );
  }
});

module.exports = Profile;
