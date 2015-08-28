var React = require('react');
var PlaylistActions = require('../actions/PlaylistActions');
var PlaylistStore = require('../stores/PlaylistStore');
var Router = require('react-router');
var Link = Router.Link;
var ArticleActions = require('../actions/ArticleActions');

var PlaylistEdit = React.createClass({

  getInitialState: function() {
    return {};
  },
  componentWillMount: function() {
    PlaylistStore.addChangeListener(this._onChange);
  },
  componentDidMount: function() {
    var query = window.location.pathname.split('/')[3];
    PlaylistActions.dispatchCreate(query);
  },
  componentWillUnmount: function() {
    PlaylistStore.removeChangeListener(this._onChange);
  },
  render: function() {
    console.log(this.state);
    return (
      <div>
        Edit Playlist {decodeURI(this.state.name)} ({this.state.id})
        <AddPlaylistItem playlistId={this.state.id} />
        <CurrentPlaylist playlistitems={this.state.playlistitems} />
        <Link to="profile" params={{username: Locals.username}}>{'Return to profile'}</Link>
      </div>
    );
  },
  _onChange: function() {
    this.setState(
      PlaylistStore.getPlaylistInfo()
    );
  }
});

var AddPlaylistItem = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var text = React.findDOMNode(this.refs.text).value.trim();
    if (!text) {
      return;
    }
    var that = this;
    ArticleActions.dispatchQuery(text).then(function(data) {
      PlaylistActions.dispatchEdit(data, that.props.playlistId);
    });
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
    if (this.props.playlistitems) {
      var itemNodes = this.props.playlistitems.map(function(item, index) {
        return (
          <div key={index}>
            {item.topic}
          </div>
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

module.exports = PlaylistEdit;
