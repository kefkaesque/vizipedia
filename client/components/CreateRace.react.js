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
    });
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
  }
});

module.exports = CreateRace;
