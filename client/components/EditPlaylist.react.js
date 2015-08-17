var React = require('react');
var PlaylistUtils = require('../utils/PlaylistUtils');
var Router = require('react-router');
var PlaylistStore = require('../stores/PlaylistStore');


function getCurrentPlaylist() {
  return {
    data: PlaylistStore.getPlaylistInfo(),
  };
}

var EditPlaylist = React.createClass({

  getInitialState: function() {
    return getCurrentPlaylist();
  },
  componentDidMount: function() {
    PlaylistStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    PlaylistStore.removeChangeListener(this._onChange);
  },
  render: function() {
    return (
      <div>
        Edit Playlist {this.state.data.playlistName} ({this.state.data.playlistId})
        <AddPlaylistItem />
        <CurrentPlaylist />
      </div>
    );
  },
  _onChange: function() {
    console.log('EditPlaylist _onChange');
    this.setState(getCurrentPlaylist());
  }
});

var AddPlaylistItem = React.createClass({
  render: function() {
    return (
      <div>
        <h2>Add Playlist Item</h2>
      </div>
    );
  }
});

var CurrentPlaylist = React.createClass({
  render: function() {
    return (
      <div>
        <h2>Current Playlist</h2>
      </div>
    );
  }
});

module.exports = EditPlaylist;
