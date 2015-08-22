var React = require('react');
var RaceActions = require('../actions/RaceActions');

var CreateRace = React.createClass({

  handlePress: function() {
    var data = {
      startTopic: 'Cat',
      endTopic: 'Dog'
    };

    RaceActions.dispatchStart(data);
  },
  endRace: function() {
    var data = {
      raceId: 1,
      finishTime: 13,
      path: [1,2,3]
    };

    RaceActions.dispatchFinish(data);
  },
  render: function() {
    return (
      <div>
        <div style={{height:200+'px'}}></div>
        <p>Create Race</p>
        <span className="button" onClick={this.handlePress}>
          Create
        </span>

        <p>"End Race"</p>
        <span className="button" onClick={this.endRace}>
          End Race
        </span>
      </div>
    )
  }
});

module.exports = CreateRace;
