var React = require('react');
var Router = require('react-router');

var PlaylistCreate = React.createClass({
  mixins: [ Router.Navigation ],

  handleSubmit: function(e) {
    e.preventDefault();
    var text = React.findDOMNode(this.refs.text).value.trim();
    if (!text) {
      return;
    }
    this.transitionTo('editPlaylist', {playlistName: text});
    React.findDOMNode(this.refs.text).value = '';
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

module.exports = PlaylistCreate;
