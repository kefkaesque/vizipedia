var React = require('react');

var Haiku = React.createClass({

  render: function() {
    return (
      <div>
      { this.props.user.data.following !== undefined || this.props.user.data.content !== undefined ? this.props.children :
        <div className="wrapper filled profile haiku">
          <div>
          <h2> {this.props.user.data.username || this.props.user.data.title} not found, a Haiku </h2>
          <div> our <a href='/'>search</a> is empty, </div>
          <div> lost amongst a morning fog, </div>
          <div> awaiting the sun. </div>
          </div>
        </div>
      }
      </div>
    );
  }
});

module.exports = Haiku;
