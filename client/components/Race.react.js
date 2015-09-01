var React = require('react');
var RaceActions = require('../actions/RaceActions');
var Router = require('react-router');
var RaceStore = require('../stores/RaceStore');
var d3 = require('d3');

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
    if(this.state.racerInfo) {
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
        <div className='race'>
          <EndRace racerInfo={this.state.racerInfo} />
        </div>
      )
    // otherwise
    } else {
      // display start page
      return (
        <div className='racefront'>
          <div style={{height:200+'px'}}></div>
          <StartRace raceInfo={this.state.raceInfo} />
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

    this.transitionTo('wiki', {topic: this.props.raceInfo.start});
  },
  render: function() {
    return (
      <div>
        <div className='big'>
          starting race...
        </div>
        <div className='med'>
          {this.props.raceInfo.start} to {this.props.raceInfo.end}
        </div>
        <span className="button" onClick={this.startRace}>
          Start
        </span>
      </div>
    )
  }
});

var EndRace = React.createClass({
  componentDidMount: function() {
    if(this.props.racerInfo) {
      d3EndRace(this.props.racerInfo);
    }
  },
  render: function() {

    return (
      <div className='d3Section'>
          FINISHED!
      </div>
    )
  }
})

module.exports = Race;

/********************************** D3 Tree. Adapted from Collapsible Tree Example ********************************************/
function d3EndRace(racerInfo) {
    var start = JSON.parse(racerInfo[0].path)[0];
    var treeData = [];
    var nodeCount = 0;
    var curCount = 0;

    var head = createRaceNode(start, 20, "steelblue");
    treeData.push(head);

    var colors = ["red","green","orange","blue"];

    //for each racer
    racerInfo.forEach(function(racer, index) {
      var path = JSON.parse(racer.path);
      var finishTime = racer.finishTime;
      var username = racer.user.username;

      createRacePath(colors[index], path.slice(1), head, username, finishTime);

    });

    function createRacePath(color, remainingPath, currentNode, username, finishTime) {
      if(remainingPath.length===1) {
        var nextNode = createRaceNode(remainingPath[0], 20, color);
        addChild(currentNode, nextNode);

        var userNode = createRaceNode(username+" finished in "+finishTime+'s', 10, "transparent");
        addChild(nextNode, userNode);
        if (curCount > nodeCount) {
          nodeCount = curCount;
        }
        curCount = 0;
        return;
      }
      curCount++;
      var nextNode = createRaceNode(remainingPath[0], 10, color);
      addChild(currentNode, nextNode);
      createRacePath(color, remainingPath.slice(1), nextNode, username, finishTime);
    }

    function createRaceNode(title, value, color) {
      return {
        "name": title,
        "value": value,
        "type": "transparent",
        "level": color,
        "children": []
      }
    }

    function addChild(parent, child) {
      parent.children.push(child);
    }

    // ************** Generate the tree diagram  *****************
    var margin = {top: 20, right: 120, bottom: 20, left: 120},
      width = 1580 - margin.right - margin.left,
      height = 800 - margin.top - margin.bottom;

    var i = 0;

    var tree = d3.layout.tree()
      .size([height, width]);

    var diagonal = d3.svg.diagonal()
      .projection(function(d) { return [d.y, d.x]; });

    var svg = d3.select(".d3Section").append("svg")
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var root = treeData[0];

    update(root);

    function update(source) {

      // Compute the new tree layout.
      var nodes = tree.nodes(root).reverse();
      var links = tree.links(nodes);

      // Normalize for fixed-depth.
      nodes.forEach(function(d) { d.y = d.depth * (1240)/(nodeCount+2); });

      // Declare the nodes…
      var node = svg.selectAll("g.node")
        .data(nodes, function(d) { return d.id || (d.id = ++i); });

      // Enter the nodes.
      var nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
          return "translate(" + d.y + "," + d.x + ")"; });

      nodeEnter.append("circle")
        .attr("r", function(d) { return d.value; })
        .style("stroke", function(d) { return d.type; })
        .style("fill", function(d) { return d.level; });

      nodeEnter.append("text")
        .attr("y", function(d) {
          return d.children || d._children ?
          (d.value + 25) * -1 : d.value + 35 })
        .attr("dx", "0.3em")
        .attr("text-anchor", function(d) {
          return d.children || d._children ? "middle" : "end"; })
        .text(function(d) { return d.name; })
        .style("fill-opacity", 1);

      // Declare the links…
      var link = svg.selectAll("path.link")
        .data(links, function(d) { return d.target.id; });

      // Enter the links.
      link.enter().insert("path", "g")
        .attr("class", "link")
          .style("stroke", function(d) { return d.target.level; })
        .attr("d", diagonal);

    }
  }
