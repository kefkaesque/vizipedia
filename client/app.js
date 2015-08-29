var React = require('react');
var Router = require('react-router');
var RaceHeader = require('./components/RaceHeader.react');
var PlaylistNavigator = require('./components/PlaylistNavigator.react');

var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

// --------------------------------------------------------------------------------

var App = React.createClass({
  statics: {
    willTransitionTo: function() {
      console.log('what is this');
    }
  },
  render: function() {
    return (
      <div className="app">
        <Header/>
        <RaceHeader/>
        <PlaylistNavigator/>
        <RouteHandler/>
      </div>
    )
  }
});

var Header = require('./components/Header.react');
var Article = require('./components/Article.react');
var Profile = require('./components/Profile.react');
var Landing = require('./components/Landing.react');
var PlaylistCreate = require('./components/PlaylistCreate.react');
var PlaylistEdit = require('./components/PlaylistEdit.react');
var Feed = require('./components/Feed.react');
var RaceCreate = require('./components/RaceCreate.react');
var Race = require('./components/Race.react');


// --------------------------------------------------------------------------------

var routes = (
  <Route handler={App}>
    <Route name="landing" path='/' handler={Landing}/>
    <Route name="wiki" path='/wiki/:topic' handler={Article}/>
    <Route name="profile" path='/profile/:username' handler={Profile}/>
    <Route name="createPlaylist" path='/playlist/create' handler={PlaylistCreate}/>
    <Route name="editPlaylist" path='/playlist/edit/:playlistName' handler={PlaylistEdit}/>
    <Route name="feed" path='/feed' handler={Feed}/>
    <Route name="race" path='/race/:raceId' handler={Race}/>
    <Route name="createRace" path='/createrace' handler={RaceCreate}/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler/>, document.body);
});
