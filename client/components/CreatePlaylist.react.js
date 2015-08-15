var React = require('react');
var PlaylistUtils = require('../utils/PlaylistUtils');
var Router = require('react-router');

var CreatePlaylist = React.createClass({
  mixins: [ Router.Navigation ],

  handleSubmit: function(e) {
    e.preventDefault();
    var text = React.findDOMNode(this.refs.text).value.trim();
    if (!text) {
      return;
    }
    PlaylistUtils.createPlaylist(text);
    React.findDOMNode(this.refs.text).value = '';
    this.transitionTo('playlist/edit', {playlistName: text});
    return;
  },
  render: function() {
    return (
      <form className="createPlaylistForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Playlist name..." ref="text" />
        <button type="submit"><span className="fa fa-search"></span></button>
      </form>
    );
  }
});

module.exports = CreatePlaylist;
