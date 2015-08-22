var React = require('react');
var Router = require('react-router');
var Race = require('./components/Race.react');

var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

// --------------------------------------------------------------------------------

var App = React.createClass({
  statics: {
    willTransitionTo() {
      console.log("TRUE HORROOORRRR");
    }
  },
  render() {
    return (
      <div className="app">
        <Header/>
        <Race/>
        <RouteHandler/>
      </div>
    )
  }
});

var Header = require('./components/Header.react');
var Article = require('./components/Article.react');
var Profile = require('./components/Profile.react');
var Landing = require('./components/Landing.react');
var CreatePlaylist = require('./components/CreatePlaylist.react');
var EditPlaylist = require('./components/EditPlaylist.react');
var Feed = require('./components/Feed.react');


// --------------------------------------------------------------------------------

var routes = (
  <Route handler={App}>
    <Route path='/' handler={Landing}/>
    <Route name="wiki" path='/wiki/:topic' handler={Article}/>
    <Route name="profile" path='/profile/:username' handler={Profile}/>
    <Route name="createPlaylist" path='/playlist/create' handler={CreatePlaylist}/>
    <Route name="editPlaylist" path='/playlist/edit/:playlistName' handler={EditPlaylist}/>
    <Route name="feed" path='/feed' handler={Feed}/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler/>, document.body);
});
