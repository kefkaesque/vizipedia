var React = require('react');
var PlaylistUtils = require('../utils/PlaylistUtils');
var Router = require('react-router');
var PlaylistStore = require('../stores/PlaylistStore');


function getCurrentPlaylist() {
  console.log('EditPlaylist.react.js getCurrentPlaylist');
  return {
    data: PlaylistStore.getPlaylistInfo(),
  };
}

var EditPlaylist = React.createClass({

  getInitialState: function() {
    return {data: 'test'}; //initialize data
  },
  render: function() {
    console.log("EditPlaylist: rendering ",this.state.data);
    return (
      <div>Edit Playlist</div>
    );
  },
  componentDidMount: function() {
    PlaylistStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    PlaylistStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    console.log('EditPlaylist.react.js onChange');
    this.setState(getCurrentPlaylist());
  }
});

module.exports = EditPlaylist;
