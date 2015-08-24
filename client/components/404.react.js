var React = require('react');

var Haiku = React.createClass({

  render: function() {
    console.log('!!!!!', this.props);
    return (
      <div className="filled">
      {this.props.user.data.following !== undefined ? this.props.children :
        <div>
          <h2> {this.props.user.data.username} not found, a Haiku </h2>
          <div> our <a href='/'>search</a> is lonely, </div>
          <div> with searching comes loss, </div>
          <div> and the presence of absence. </div>
        </div>
      }
      </div>
    );
  }
});

module.exports = Haiku;
