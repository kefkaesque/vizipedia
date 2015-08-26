var React = require('react');
var Search = require('./Search.react');

var Landing = React.createClass({
  render: function() {
    return (
      <div className="splash">
        <div className="spacer"></div>
        <div>
          <div className="logo serif">vizipedia</div>
          <Search />
        </div>
      </div>
    )
  }
});

module.exports = Landing;
