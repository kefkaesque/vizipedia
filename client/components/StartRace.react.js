var React = require('react');
var RaceActions = require('../actions/RaceActions');
var Router = require('react-router');
var RaceStore = require('../stores/RaceStore');

var StartRace = React.createClass({
  mixins: [ Router.Navigation ],

  getInitialState: function(){
    return RaceStore.getData();
  },

  startRace: function() {
    console.log("startrace state: ", this.state);
    RaceActions.startAndDispatch({
      racing: true,
      start: this.state.start,
      end: this.state.end,
    });

    this.transitionTo('wiki', {topic: this.state.start}); //hardcoded in, replace
  },
  render: function() {
    return (
      <div>
        <div style={{height:200+'px'}}></div>
        <span className="button" onClick={this.startRace}>
          Start
        </span>
      </div>
    )
  }
});

module.exports = StartRace;
