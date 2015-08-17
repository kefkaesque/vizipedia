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
     return {data: {}};
  },
  componentDidMount: function() {
    ProfileStore.addChangeListener(this._onChange);
    ProfileUtils.getProfileData();// remove later
    return getProfileState();
  },
  componentWillUnmount: function() {
    ProfileStore.removeChangeListener(this._onChange);
  },
  render: function() {
    return (
      <div className="mainProfile">
        <ProfileHeader username={this.state.data.username} />
        <ReadCompletion numArticle={this.state.data.numArticle}/>
        <RecommendedArticles />
        <CommentsMade />
        <Playlists />
        <FollowButton />
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
        <h1>{this.props.username}</h1>
        <h2>Followed by 100</h2>
        <h2>Following 15</h2>
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
    return (
      <div className="playlists">
        <h3>Playlists</h3>
        <Link to="createPlaylist">
          {'Create New Playlist'}
        </Link>
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
    console.log('FollowButton Pressed!')
    ProfileUtils.postProfileData();
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
