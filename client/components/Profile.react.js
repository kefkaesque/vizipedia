var React = require('react');
var ProfileStore = require('../stores/ProfileStore');
var Recommend = require('./Recommend.react');
var ProfileActions = require('../actions/ProfileActions');
var Router = require('react-router');
var Link = Router.Link;
var RaceActions = require('../actions/RaceActions');
var PlaylistActions = require('../actions/PlaylistActions');
var RecommendStore = require('../stores/RecommendStore');
var RecActions = require('../actions/RecActions');
var Haiku = require('./404.react');
var Loader = require('./Loader.react');
var Follow = require('./Follow.react');

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
      <div className="profile">
        <ProfileHeader data={this.state.data}/>
        <div className="wrapper">
          <RecommendedArticles/>
          <Playlists username={this.state.data.username} playlists={this.state.data.playlists} />
          <UserRaces data={this.state.data}/>
        </div>
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
      <div className="top">
        <div className="info wrapper">
          <div className="username serif">
            {this.props.data.username}
          </div>
          <div className="actions">
            {Locals.username !== this.props.data.username ?
              <Follow username={this.props.data.username}/> :
              <div></div>
            }
          </div>
          <div className="row">
            <div className="item">
              <p>FOLLOWERS</p>
              <span className="serif">{this.props.data.followedBy}</span>
            </div>
            <div className="item">
              <p>FOLLOWING</p>
              <span className="serif">{this.props.data.following}</span>
            </div>
            <div className="item">
              <p>ARTICLES READ</p>
              <span className="serif">{this.props.data.numArticle}</span>
            </div>
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
    var itemNodes;
    if (this.state.races) {
      itemNodes = this.state.races.map(function(item, index) {
        return (
          <RaceItem raceInfo={item} key={index}/>
        );
      });
    } else {
      itemNodes = '';
    }

    return (
      <div className="race section">
        <h2>Races</h2>
        <div className="container">
          {Locals.username === this.props.data.username ? <RaceButton/> : null }
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
  mixins: [ Router.Navigation ],

  handlePress: function(e) {
    if (!Locals.username) {
      window.location.href = "/login";
    } else {
      this.transitionTo('race', {raceId: this.props.raceInfo.raceId});
    }
  },
  render: function() {
    return (
    <a href="javascript:;">
      <div className="box" onClick={this.handlePress}>
        {this.props.raceInfo.race.start} to {this.props.raceInfo.race.end }
      </div>
    </a>
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
        <h2>Recommended</h2>
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
      <div className="box" style={{background:'url("'+this.props.article.image+'")'}}>
        <div className="text">{this.props.article.title.replace(/_/g," ")}</div>
      </div>
    );
  }
});

var Playlists = React.createClass({
  render: function() {

    var itemNodes;
    if(this.props.playlists){
      itemNodes = this.props.playlists.map(function(list, index) {
        return (
          <PlaylistItem playlist={list} key={index} />
        );
      });
    }

    return (
      <div className="playlists section">
        <h2>Playlists</h2>
        <div className="container" >
          {Locals.username===this.props.username ?
            <Link to="createPlaylist">
              <div className="box">
                Create Playlist
              </div>
            </Link> : null}
          {itemNodes}
        </div>
      </div>
    )
  }
});

var PlaylistItem = React.createClass({
  mixins: [ Router.Navigation ],

  handlePress: function(e) {
    PlaylistActions.dispatchViewing(this.props.playlist);
    var topic = this.props.playlist.playlistitems[0].topic;
    this.transitionTo('wiki', {topic: topic});
  },
  render: function() {
    return (
    <a href="javascript:;">
      <div className="playlistItem box" onClick={this.handlePress} style={{background:'url("'+this.props.playlist.playlistitems[0].wikiarticle.image+'")'}}>
        <div className="text">{decodeURI(this.props.playlist.name)}</div>
      </div>
    </a>
    );
  }
});

var RaceButton = React.createClass({
  mixins: [ Router.Navigation ],

  handlePress: function(e) {
    if (!Locals.username) {
      window.location.href = "/login";
    } else {
      this.transitionTo('createRace');
    }
  },
  render: function() {
    return (
      <div className="box" onClick={this.handlePress}>
        Create Race
      </div>
    );
  }
});

module.exports = Profile;
