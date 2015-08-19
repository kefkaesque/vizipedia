var React = require('react');
var RaceStore = require('../stores/RaceStore');

var Race = React.createClass({
  getInitialState: function() {
    return {
      racing: false
    };
  },
  componentDidMount: function() {
    RaceStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    RaceStore.removeChangeListener(this._onChange);
  },
  render: function() {
    if(this.state.racing) {
      return (
        <div className="race">
          Race!
          <p>{this.state.currentArticle || 'no current article'}</p>
          <p>From {this.state.start || '?'} to {this.state.end || '?'}</p>
        </div>
      );
    }
    return (<div className="race"></div>)
  },
  _onChange: function() {
    this.setState(RaceStore.getData());
  }

});

module.exports = Race;
