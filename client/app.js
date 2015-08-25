var React = require('react');
var Router = require('react-router');
var RaceHeader = require('./components/RaceHeader.react');

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
        <RaceHeader/>
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
var PlaylistItems = require('./components/PlaylistItems.react');
var Feed = require('./components/Feed.react');
var CreateRace = require('./components/CreateRace.react');
var Race = require('./components/Race.react');


// --------------------------------------------------------------------------------

var routes = (
  <Route handler={App}>
    <Route name="landing" path='/' handler={Landing}/>
    <Route name="wiki" path='/wiki/:topic' handler={Article}/>
    <Route name="profile" path='/profile/:username' handler={Profile}/>
    <Route name="createPlaylist" path='/playlist/create' handler={CreatePlaylist}/>
    <Route name="editPlaylist" path='/playlist/edit/:playlistName' handler={EditPlaylist}/>
    <Route name="playlistItems" path='/playlist/items/:playlistName' handler={PlaylistItems}/>
    <Route name="feed" path='/feed' handler={Feed}/>
    <Route name="race" path='/race/:raceId' handler={Race}/>
    <Route name="createRace" path='/createrace' handler={CreateRace}/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler/>, document.body);
});
