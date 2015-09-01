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
   // if the race is done and the race is loaded and still racing
    if(!this.state.finished && this.state.raceInfo && this.state.racing) {
      var end = this.state.raceInfo.end;
      if (end) {
        end = end.replace(/_/g, " ").toLowerCase();
      }
      var start = this.state.currentArticle;
      if (start) {
        start = start.replace(/_/g, " ").toLowerCase();
      }
      if(start===end){
        this.setState({finished: true});
      }
    }

    if(this.userHasCompleted()) {
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
        <div className="raceheader">
          <p>Racing from {this.state.raceInfo.start || '?'} to {this.state.raceInfo.end || '?'}</p>
          <Timer finished={this.state.finished} endRace={this.endRace} />
        </div>
      );
    }
    return (<div className="race"></div>)
  },
  _onChange: function() {
    this.replaceState(RaceStore.getData());
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
        var elapsed = Math.round(this.state.elapsed / 100);
        var seconds = (elapsed / 10).toFixed(2);
        this.props.endRace(seconds);
      }
    },

    render: function() {
        var elapsed = Math.round(this.state.elapsed/10);
        var min = Math.floor(elapsed/6000);
        var seconds = Math.floor(elapsed/100 - 60 * min);
        var centiseconds = elapsed - 100 * seconds - 6000 * min;

        if(seconds.toString().length < 2) {
          seconds = "0" + seconds;
        }

        if(centiseconds.toString().length < 2) {
          centiseconds = "0" + centiseconds;
        }

        return <p className='timer serif'>{min}:{seconds}:{centiseconds}</p>;
    }
});

module.exports = RaceHeader;
