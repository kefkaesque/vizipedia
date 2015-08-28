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
  componentDidMount: function() {
    if(this.props.racerInfo) {
      d3EndRace(this.props.racerInfo);
    }
  },
  render: function() {

    return (
      <div className='d3Section'>
          End
      </div>
    )
  }
})

module.exports = Race;

/********************************** D3 Tree. Adapted from Collapsible Tree Example ********************************************/
function d3EndRace(racerInfo) {
    var start = JSON.parse(racerInfo[0].path)[0];
    var treeData = [];

    var head = createRaceNode(start, 20, "steelblue");
    treeData.push(head);

    var colors = ["red","orange","blue","green"];

    //for each racer
    racerInfo.forEach(function(racer, index) {
      var path = JSON.parse(racer.path); //article path array
      var finishTime = racer.finishTime;
      var username = racer.user.username;

      createRacePath(colors[index], path.slice(1), head, username, finishTime);

    });

    function createRacePath(color, remainingPath, currentNode, username, finishTime) {
      if(remainingPath.length===0) {
        var userNode = createRaceNode(username+" finished in "+finishTime+'s', 20, color);
        addChild(currentNode, userNode);
        return;
      }

      var nextNode = createRaceNode(remainingPath[0], 10, color); // Mammal
      addChild(currentNode, nextNode);
      createRacePath(color, remainingPath.slice(1), nextNode, username, finishTime);
    }

    function createRaceNode(title, value, color) {
      return {
        "name": title,
        "value": value,
        "type": "black",
        "level": color,
        "children": []
      }
    }

    function addChild(parent, child) {
      parent.children.push(child);
    }

    // ************** Generate the tree diagram  *****************
    var margin = {top: 20, right: 120, bottom: 20, left: 120},
      width = 960 - margin.right - margin.left,
      height = 500 - margin.top - margin.bottom;

    var i = 0;

    var tree = d3.layout.tree()
      .size([height, width]);

    var diagonal = d3.svg.diagonal()
      .projection(function(d) { return [d.y, d.x]; });

    var svg = d3.select(".d3Section").append("svg")
      .attr("width", width + margin.right + margin.left)
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
      nodes.forEach(function(d) { d.y = d.depth * 180; });

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
        .attr("x", function(d) {
          return d.children || d._children ?
          (d.value + 4) * -1 : d.value + 4 })
        .attr("dy", ".35em")
        .attr("text-anchor", function(d) {
          return d.children || d._children ? "end" : "start"; })
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
