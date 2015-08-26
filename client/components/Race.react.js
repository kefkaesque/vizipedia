var React = require('react');
var RaceActions = require('../actions/RaceActions');
var Router = require('react-router');
var RaceStore = require('../stores/RaceStore');

var Race = React.createClass({

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

    // if anyone has finished the race
    if(this.state.racerInfo) { //.length?
      // see if the current user has finished the race
      return this.state.racerInfo.reduce(function(previousValue, currentValue) {
        return previousValue || currentValue.userId === currentUser;
      }, false);
    }
  },
  render: function() {
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
    return RaceStore.getData();
  },
  startRace: function() {
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
    if (this.props.racerInfo) {
      var itemNodes = this.props.racerInfo.map(function(item, index) {
        return (
          <div key={index}>
            <p> User ID: {item.userId} </p>
            <p> Finish Time: {item.finishTime} </p>
            <p> Path: {item.path} </p>
          </div>
        );
      });
    } else {
      itemNodes = '';
    }

    return (
      <div>
          End
          {itemNodes}
      </div>
    )
  }
})

module.exports = Race;
