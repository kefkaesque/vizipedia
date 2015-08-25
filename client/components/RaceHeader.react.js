var React = require('react');
var RaceStore = require('../stores/RaceStore');
var RaceActions = require('../actions/RaceActions');
var Router = require('react-router');

var RaceHeader = React.createClass({
  mixins: [ Router.Navigation ],

  getInitialState: function() {
    return {
      racing: false,
      finished: false,
      articlePath: []
    };
  },
  componentDidMount: function() {
    RaceStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    RaceStore.removeChangeListener(this._onChange);
  },
  componentDidUpdate: function() {
    if(!this.state.finished && this.state.raceInfo && this.state.racing) { // if the race is done and the race is loaded and still racing
      if(this.state.raceInfo.end===this.state.currentArticle){
        this.setState({finished: true});
      }
    }

    if(this.state.finished && this.userHasCompleted()) {
      this.transitionTo('race', {raceId: this.state.raceInfo.id});
      this.replaceState(this.getInitialState());
    }
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
  endRace: function(finishTime) {
    var data = {
      raceId: this.state.raceInfo.id,
      finishTime: finishTime,
      path: this.state.articlePath
    };
    RaceActions.finishAndDispatch(data);
  },
  render: function() {
    if(this.state.racing) {
      return (
        <div className="race">
          Race!
          <p>{this.state.currentArticle || 'no current article'}</p>
          <p>From {this.state.raceInfo.start || '?'} to {this.state.raceInfo.end || '?'}</p>
          <Timer finished={this.state.finished} endRace={this.endRace} />
        </div>
      );
    }
    return (<div className="race"></div>)
  },
  _onChange: function() {
    this.setState(RaceStore.getData());
  }

});

var Timer = React.createClass({

    getInitialState: function(){
        return {
          elapsed: 0,
          start: Date.now()
        };
    },

    componentDidMount: function(){
        this.timer = setInterval(this.tick, 50);
    },

    componentWillUnmount: function(){
        clearInterval(this.timer);
    },

    tick: function(){
      if(!this.props.finished){
        this.setState({elapsed: new Date() - this.state.start});
      } else {
        clearInterval(this.timer);
        this.props.endRace(Math.round(this.state.elapsed/1000));
      }
    },

    render: function() {
        var elapsed = Math.round(this.state.elapsed / 100);
        // This will give a number with one digit after the decimal dot (xx.x):
        var seconds = (elapsed / 10).toFixed(1);

        return <p>Time elapsed: <b>{seconds} seconds</b> </p>;
    }
});

module.exports = RaceHeader;
