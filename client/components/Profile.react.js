var React = require('react');
var ProfileStore = require('../stores/ProfileStore');
var Recommend = require('./Recommend.react');
var ProfileActions = require('../actions/ProfileActions');
var Router = require('react-router');
var Link = Router.Link;
var RaceActions = require('../actions/RaceActions');
var RecommendStore = require('../stores/RecommendStore');
var RecActions = require('../actions/RecActions');
var Haiku = require('./404.react');
var Loader = require('./Loader.react');

var Profile = React.createClass({

  getInitialState: function() {
    return {
      data: '',
      loaded: false
    };
  },
  componentWillMount: function() {
    ProfileStore.addChangeListener(this._onChange);
  },
  componentDidMount: function() {
    var query = window.location.pathname.split('/')[2];
    ProfileActions.dispatchProfileData(query);
  },
  componentWillReceiveProps: function() {
    // this.setState({username: null, loaded: false});
    var query = window.location.pathname.split('/')[2];
    ProfileActions.dispatchProfileData(query);
  },
  componentWillUnmount: function() {
    ProfileStore.removeChangeListener(this._onChange);
  },
  render: function() {
    return (
      <Loader loaded={this.state.loaded}>
      <Haiku user={this.state}>
      <div className="profile wrapper">
        <ProfileHeader data={this.state.data}/>
          <UserRaces />
          <RecommendedArticles/>
          <CommentsMade />
          <Playlists username={this.state.data.username} playlists={this.state.data.playlists} />
      </div>
      </Haiku>
      </Loader>
    );
  },
  _onChange: function() {
    this.setState({
      data: ProfileStore.getData(),
      loaded: true
    });
  }
});

var ProfileHeader = React.createClass({

  render: function() {
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
        {Locals.username !== this.props.data.username ?
          <div className="item">
            <FollowButton username={this.props.data.username}/>
          </div> :
          <div></div>
        }
          <div className="item">
            <RaceButton/>
          </div>
        </div>
      </div>
    )
  }
});

var UserRaces = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentWillMount: function() {
    ProfileStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    ProfileStore.removeChangeListener(this._onChange);
  },
  render: function() {
    if (this.state.races) {
      var itemNodes = this.state.races.map(function(item, index) {
        return (
          <Link to="race" params={{raceId: item.raceId}} key={index}>
            <RaceItem raceId={item.raceId} />
          </Link>
        );
      });
    } else {
      itemNodes = '';
    }
    return (
      <div className="race section">
        <h3>Races</h3>
        <div className="container">
          {itemNodes}
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

var RaceItem = React.createClass({
  render: function() {
    return (
      <div className="box">
        {this.props.raceId}
      </div>
    );
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
          <Link to="wiki" params={{topic: item.wikiarticle.title}}  key={index}>
          <RecItem article={item.wikiarticle} />
          </Link>
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
      <div className="box" style={{backgroundImage:'url('+this.props.article.image+')' }}>
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
    if(this.props.playlists){
      itemNodes = this.props.playlists.map(function(list, index) {
        return (
          <Link to="playlistItems" params={{playlistName: list.name}} query={{ playlistId: list.id, userId: list.userId, username: username }} key={index} >
            <PlaylistItem name={list.name} />
          </Link>
        );
      });
    }

    return (
      <div className="playlists section">
        <h3>Playlists</h3>
        <div>
          {createLink}
        </div>
        <div className="container" >
          {itemNodes}
        </div>
      </div>
    )
  }
});

var PlaylistItem = React.createClass({
  render: function() {
    return (
      <div className="playlistItem box">
        {this.props.name}
      </div>
    );
  }
});

var FollowButton = React.createClass({

  mixins: [ Router.Navigation ],

  handlePress: function(e) {
    if (!Locals.username) {
      window.location.href = "/login";
    } else {
      ProfileActions.dispatchFollow(this.props.username);
    }
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
    this.transitionTo('createRace');
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
