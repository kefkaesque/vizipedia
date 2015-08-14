var React = require('react');
var Router = require('react-router');
var WikiUtils = require('./utils/WikiUtils');


var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

// --------------------------------------------------------------------------------

var App = React.createClass({
  render() {
    return (
      <div>
        <h1>Welcome to the app</h1>
        <RouteHandler/>
      </div>
    )
  }
});

var Landing = React.createClass({
  render() {
    return (
      <div>
        <h1>Landing</h1>
        <Link to="wiki" params={{topic: "google"}}>
          {'this links to ... google'}
        </Link>
        <Link to="profile">
          {'this links to ... profile'}
        </Link>
        <div className="splash">
          <div className="spacer"></div>
          <div>
            <div className="logo serif">vizipedia</div>
            <form>
              <input type="text" name="topic" placeholder="Search..."/>
              <button onclick="WikiUtils.getArticleData(topic)
"><span className="fa fa-fw fa-search"></span></button>
            </form>
          </div>
        </div>
      </div>
    )
  }
});

var Header = require('./components/Header.react');
var Article = require('./components/Article.react');
var Profile = require('./components/Profile.react');

// var Article = React.createClass({
//   render() {
//     return (
//         <h1>Article: {this.props.params.topic}</h1>
//     )
//   }
// });

// --------------------------------------------------------------------------------

var routes = (
  <Route handler={App}>
    <Route path='/' handler={Landing}/>
    <Route name="wiki" path='/wiki/:topic' handler={Article}/>
    <Route name="profile" path='/profile' handler={Profile}/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler/>, document.body);
});
