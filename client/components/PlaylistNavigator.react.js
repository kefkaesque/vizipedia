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
    this.transitionTo('profile', {username: this.state.current.user.username});
  },
  componentWillUnmount: function() {
    PlaylistStore.removeChangeListener(this._onChange);
  },
  render: function() {
    if(this.state.viewing) {
      return (
        <div className="playlist">
          <div className="close" onClick={this.closePlaylist}>
            <span className="fa fa-fw fa-close"></span> Close
          </div>
          <CurrentPlaylist playlistitems={this.state.current.playlistitems} />
        </div>
      );
    }

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
            <PlaylistItem topic={item.topic} image={item.wikiarticle.image} key={index} />
          </Link>
        );
      });
    } else {
      itemNodes = '';
    }
    return (
      <div>
        {itemNodes}
      </div>
    );
  }
});

var PlaylistItem = React.createClass({
  render: function() {
    return (
      <div className="box" style={{background:'url("'+this.props.image+'")'}}>
        <div className="text">{this.props.topic}</div>
      </div>
    );
  }
})

module.exports = PlaylistNavigator;
