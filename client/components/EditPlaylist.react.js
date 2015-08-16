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
  render: function() {
    return (
      <div>Edit Playlist {this.state.data.playlistName} ({this.state.data.playlistId})</div>
    );
  },
  componentDidMount: function() {
    PlaylistStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    PlaylistStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    console.log('EditPlaylist _onChange');
    this.setState(getCurrentPlaylist());
  }
});

module.exports = EditPlaylist;
