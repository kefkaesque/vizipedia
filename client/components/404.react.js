var React = require('react');

var Haiku = React.createClass({

  render: function() {
    return (
      <div className="filled">
      {this.props.user.data.following !== undefined ? this.props.children :
        <div>
          <h2> {this.props.user.data.username} not found, a Haiku </h2>
          <div> our <a href='/'>search</a> is empty, </div>
          <div> lost amongst a morning fog, </div>
          <div> awaiting the sun. </div>
        </div>
      }
      </div>
    );
  }
});

module.exports = Haiku;
