var React = require('react');
var RaceActions = require('../actions/RaceActions');
var Router = require('react-router');

var CreateRace = React.createClass({
  mixins: [ Router.Navigation ],

  createRace: function() {
    var data = {
      startTopic: 'Cat',
      endTopic: 'Dog'
    };

    var creator = this;
    RaceActions.createAndDispatch(data)
    .then(function() {
      creator.transitionTo('startRace');
    })
  },
  // endRace: function() {
  //   var data = {
  //     raceId: 1,
  //     finishTime: 13,
  //     path: [1,2,3]
  //   };

  //   RaceActions.finishAndDispatch(data);
  // },
  render: function() {
    return (
      <div>
        <div style={{height:200+'px'}}></div>
        <p>Create Race</p>
        <span className="button" onClick={this.createRace}>
          Create
        </span>

        {/*<p>"End Race"</p>
        <span className="button" onClick={this.endRace}>
          End Race
        </span>*/}
      </div>
    )
  }
});

module.exports = CreateRace;
