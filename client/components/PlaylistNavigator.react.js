var React = require('react');
var PlaylistActions = require('../actions/PlaylistActions');
var PlaylistStore = require('../stores/PlaylistStore');
var Router = require('react-router');
var Link = Router.Link;

var PlaylistNavigator = React.createClass({
  mixins: [ Router.Navigation ],

  getInitialState: function() {
    return {};
  },
  componentWillMount: function() {
    PlaylistStore.addChangeListener(this._onChange);
  },
  nextArticle: function() {
    var next = this.state.currentItem + 1;

    if(this.state.current.playlistitems[next]){
      PlaylistActions.dispatchNav(next);
      var topic = this.state.current.playlistitems[next].topic;
      this.transitionTo('wiki', {topic: topic});
    }
  },
  prevArticle: function() {
    var prev = this.state.currentItem - 1;

    if(this.state.current.playlistitems[prev]){
      PlaylistActions.dispatchNav(prev);
      var topic = this.state.current.playlistitems[prev].topic;
      this.transitionTo('wiki', {topic: topic});
    }
  },
  closePlaylist: function() {
    PlaylistActions.dispatchClose();
  },
  componentWillUnmount: function() {
    PlaylistStore.removeChangeListener(this._onChange);
  },
  render: function() {

    if(this.state.viewing) {
      return (
        <div className="playlistitems wrapper">
          <CurrentPlaylist playlistitems={this.state.current.playlistitems} />
          <div onClick={this.closePlaylist}>
            Close
          </div>
          <div onClick={this.nextArticle}>
            Next
          </div>
          <div onClick={this.prevArticle}>
            Previous
          </div>
        </div>
      );
    }
          // <Link to="profile" params={{username: this.props.query.username}}>{'Return to profile'}</Link>

    return (<div></div>);
  },
  _onChange: function() {
    this.setState(
      PlaylistStore.getPlaylistInfo()
    );
  }
});

var CurrentPlaylist = React.createClass({
  render: function() {
    if (this.props.playlistitems) {
      var itemNodes = this.props.playlistitems.map(function(item, index) {
        return (
          <Link to="wiki" params={{topic: item.topic}} key={index}>
          <PlaylistItem topic={item.topic} key={index} />
          </Link>
        );
      });
    } else {
      itemNodes = '';
    }
    return (
      <div>
        <h2 className="head">Current Playlist</h2>
        {itemNodes}
      </div>
    );
  }
});

var PlaylistItem = React.createClass({
  render: function() {
    return (
      <div className="box">
        {this.props.topic}
      </div>
    );
  }
})

module.exports = PlaylistNavigator;
