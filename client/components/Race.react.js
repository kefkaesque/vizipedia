var React = require('react');
var RaceActions = require('../actions/RaceActions');
var Router = require('react-router');
var RaceStore = require('../stores/RaceStore');

var Race = React.createClass({
  getInitialState: function() {
    return {
      racing: false,
      finished: false,
      articlePath: []
    }
  componentWillMount: function (){
    RaceStore.addChangeListener(this._onChange);
  },
  componentDidMount: function() {
    RaceActions.getRaceDataAndDispatch(this.props.params.raceId);
  },
  componentWillUnmount: function() {
    RaceStore.removeChangeListener(this._onChange);
  },
  userHasCompleted: function() {
    var currentUser = Locals.userid;
    console.log('race state: ', this.state);

    // if anyone has finished the race
    if(this.state.racerInfo) { //.length?
      // see if the current user has finished the race
      return this.state.racerInfo.reduce(function(previousValue, currentValue) {
        return previousValue || currentValue.userId === currentUser;
      }, false);
    }
  },
  render: function() {
    console.log('rendering...', this.state);
    // display blank page if state is not yet loaded
    if(!this.state) {
      return (
        <div>
          loading...
        </div>
      )
    };
    // if this user is among the finished racers
    if(this.userHasCompleted()) {
      console.log('user has completed', this.state);
      // display finished racer data
      return (
        <div>
          <div style={{height:200+'px'}}></div>
          <EndRace racerInfo={this.state.racerInfo} />
        </div>
      )
    // otherwise
    } else {
      // display start page
      return (
        <div>
          <div style={{height:200+'px'}}></div>
          <StartRace start={this.state.raceInfo.start} />
        </div>
      )
    }
  },
  _onChange: function() {
    this.setState(RaceStore.getData());
  }
});

var StartRace = React.createClass({
  mixins: [ Router.Navigation ],
  getInitialState: function(){
    console.log("race params: ", this.props.params);
    return RaceStore.getData();
  },
  startRace: function() {
    console.log("startrace state: ", this.state);
    RaceActions.startAndDispatch({
      racing: true
    });

    this.transitionTo('wiki', {topic: this.props.start});
  },
  render: function() {
    return (
      <div>
        <span className="button" onClick={this.startRace}>
          Start
        </span>
      </div>
    )
  }
});

var EndRace = React.createClass({
  render: function() {
    console.log('EndRace', this.props);
    return (
      <div>
          End
          <p> Finish Time: {this.props.racerInfo[0].finishTime} </p>
          <p> Path: {this.props.racerInfo[0].path} </p>
      </div>
    )
  }
})

module.exports = Race;
