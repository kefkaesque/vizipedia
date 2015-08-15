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
        <div style={{height:200+'px'}}></div>
        <input type="text" placeholder="Enter playlist name..." ref="text" />
        <button type="submit">Create</button>
      </form>
    );
  }
});

module.exports = CreatePlaylist;
