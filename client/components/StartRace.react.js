var React = require('react');
var RaceActions = require('../actions/RaceActions');

var StartRace = React.createClass({
  mixins: [ Router.Navigation ],

  startRace: function() {
    // RaceActions.dispatchRacing({
    //   racing:true,
    //   start: 2, //article id for cat in my db
    //   end: 8, //article id for dog in my db
    // });
    this.transitionTo('wiki', {topic: 'Cat'}); //hardcoded in, replace
  },
  render: function() {
    return (
      <div>
        <div style={{height:200+'px'}}></div>

        <p>"Start Race"</p>
        <span className="button" onClick={this.startRace}>
          Start
        </span>
      </div>
    )
  }
});

module.exports = StartRace;
