var React = require('react');
var PlaylistActions = require('../actions/PlaylistActions');
var PlaylistStore = require('../stores/PlaylistStore');
var Router = require('react-router');
var Link = Router.Link;

var PlaylistItems = React.createClass({

  getInitialState: function() {
    console.log('In playlistitems !!!', this.props);

    return {};
  },
  componentWillMount: function() {
    // PlaylistStore.addChangeListener(this._onChange);
  },
  componentDidMount: function() {
    var query = window.location.pathname.split('/')[4];
    console.log('query in playlistitems', query);
    // PlaylistActions.dispatchCreate(query);
  },
  componentWillUnmount: function() {
    // PlaylistStore.removeChangeListener(this._onChange);
  },
  render: function() {
    return (
      <div>
         Yo!!
        // Edit Playlist {this.state.name} ({this.state.id})
        // <CurrentPlaylist playlistitems={this.state.playlistitems} />
      </div>
    );
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
         <PlaylistItem topic={item.topic} key={index} />
        );
      });
    } else {
      itemNodes = '';
    }
    return (
      <div>
        <h2>Current Playlist</h2>
        {itemNodes}
      </div>
    );
  }
});

var PlaylistItem = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.topic}
      </div>
    );
  }
})

module.exports = PlaylistItems;