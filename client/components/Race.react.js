var React = require('react');
var RaceStore = require('../stores/RaceStore');
var RaceActions = require('../actions/RaceActions');

var Race = React.createClass({
  getInitialState: function() {
    return {
      racing: false,
      finished: false,
      articlePath: []
    }
  },
  componentDidMount: function() {
    RaceStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    RaceStore.removeChangeListener(this._onChange);
  },
  componentDidUpdate: function() {
    if(!this.state.finished && this.state.end && this.state.end===this.state.currentArticle) {
      this.setState({finished:true});
    }
  },
  endRace: function(finishTime) {
    var data = {
      raceId: this.state.raceId,
      finishTime: finishTime,
      path: this.state.articlePath
    };
    console.log(data);
    RaceActions.finishAndDispatch(data);
  },
  render: function() {
    if(this.state.racing) {
      return (
        <div className="race">
          Race!
          <p>{this.state.currentArticle || 'no current article'}</p>
          <p>From {this.state.start || '?'} to {this.state.end || '?'}</p>
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
        console.log('tick', this.state);
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

module.exports = Race;
