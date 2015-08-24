var React = require('react');

var Haiku = React.createClass({

  render: function() {
    return (
      <div className="filled">
        <h2> {this.props.user} not found, a Haiku </h2>
        <div> our <a href='/'>search</a> is lonely, </div>
        <div> with searching comes loss, </div>
        <div> and the presence of absence. </div>
      </div>
    );
  }
});

module.exports = Haiku;
