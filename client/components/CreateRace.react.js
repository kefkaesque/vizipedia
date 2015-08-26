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
  createRace: function(e) {
    e.preventDefault();
    var startText = React.findDOMNode(this.refs.startText).value.trim();
    var endText = React.findDOMNode(this.refs.endText).value.trim();
    if (!startText || !endText) {
      return;
    }
    var data = {
      startTopic: startText,
      endTopic: endText
    };
    RaceActions.createAndDispatch(data);
  },
  transitionToStart: function() {
    this.transitionTo('race', {raceId: this.state.raceInfo.id});
  },
  render: function() {
    return (
      <div>
        <div style={{height:200+'px'}}></div>
        <form className ="headerForm" onSubmit={this.createRace}>
          <input type="text" placeholder="Start" ref="startText" />
          <input type="text" placeholder="End" ref="endText" />
          <button type="submit">Create</button>
        </form>
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
