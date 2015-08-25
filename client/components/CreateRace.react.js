var React = require('react');
var RaceActions = require('../actions/RaceActions');
var Router = require('react-router');
var RaceStore = require('../stores/RaceStore');

var CreateRace = React.createClass({
  mixins: [ Router.Navigation ],
  componentDidMount: function() {
    RaceStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    RaceStore.removeChangeListener(this._onChange);
  },
  createRace: function() {
    var data = {
      startTopic: 'Cat',
      endTopic: 'Dog'
    };

    RaceActions.createAndDispatch(data)
  },
  transitionToStart: function() {
    this.transitionTo('race', {raceId: this.state.raceInfo.id});
  },
  render: function() {
    return (
      <div>
        <div style={{height:200+'px'}}></div>
        <span className="button" onClick={this.createRace}>
          Create
        </span>
      </div>
    )
  },
  _onChange: function() {
    this.setState(RaceStore.getData());
    if (this.state.raceInfo.id) {
      this.transitionToStart();
    }
  }
});

module.exports = CreateRace;
