var React = require('react');
var PlaylistUtils = require('../utils/PlaylistUtils');
var PlaylistStore = require('../stores/PlaylistStore');
var Router = require('react-router');
var Link = Router.Link;

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
        Edit Playlist {this.state.data.name} ({this.state.data.id})
        <AddPlaylistItem playlistId={this.state.data.id} />
        <CurrentPlaylist playlistitems={this.state.data.playlistitems} />
        <Link to="profile" params={{username: Locals.username}}>{'Return to profile'}</Link>
      </div>
    );
  },
  _onChange: function() {
    this.setState(getCurrentPlaylist());
  }
});

var AddPlaylistItem = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var text = React.findDOMNode(this.refs.text).value.trim();
    if (!text) {
      return;
    }
    PlaylistUtils.addItem(text, this.props.playlistId);
    React.findDOMNode(this.refs.text).value = '';
  },
  render: function() {
    return (
      <div>
        <h2>Add Playlist Item</h2>
        <form className="addPlaylistItem" onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Enter playlist item..." ref="text" />
          <button type="submit">Add to playlist</button>
        </form>
      </div>
    );
  }
});

var CurrentPlaylist = React.createClass({
  render: function() {
    var itemNodes = this.props.playlistitems.map(function(item, index) {
      return (
        <PlaylistItem topic={item.topic} key={index} />
      );
    });
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

module.exports = EditPlaylist;
