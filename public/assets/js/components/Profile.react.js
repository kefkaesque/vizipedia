var ProfileStore = require('../stores/ProfileStore');

var Profile = React.createClass({
  getProfileState: function() {
    return {
      data: ProfileStore.getData(),
    };
  },
  getInitialState: function() {
    return this.getProfileState();
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
        <ProfileHeader username={this.state.username} />
        <ReadCompletion />
        <RecommendedArticles />
        <CommentsMade />
        <Playlists />
      </div>
    )
  },
  _onChange: function() {
    this.setState(this.getProfileState());
  }
});

var ProfileHeader = React.createClass({

  render: function() {
    return (
      <div className="header">
        <h1>{this.state.username}</h1>
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
        <p>0.14% of Wikipedia read</p>
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
      <div classname="playlists">
        <h3>Playlists</h3>
        <ul>
          <li>Data Structures</li>
          <li>Road trip to NYC</li>
        </ul>
      </div>
    )
  }
});
