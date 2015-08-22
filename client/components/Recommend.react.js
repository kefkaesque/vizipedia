var React = require('react');
var RecommendStore = require('../stores/RecommendStore');
var RecActions = require('../actions/RecActions');

var RecommendButton = React.createClass({
  disable: false,
  flag: false,
  getInitialState: function() {
    return {
    };
  },
  componentWillMount: function() {
    RecommendStore.addChangeListener(this._onChange);
  },
  componentDidMount: function() {
    RecActions.dispatchArticleRecs(this.props.info.id);
    if (Locals.userid) {
      RecActions.dispatchRecState(Locals.userid, this.props.info.id);
    }
  },
  componentWillUnmount: function() {
    RecommendStore.removeChangeListener(this._onChange);
  },
  handleButton: function(articleId) {
    this.disabled = true;
    if (Locals.userid) {
      if ((this.state.state || this.flag) && !(this.state.state && this.flag)) {
        RecActions.dispatchRec(articleId);
      } else {
        RecActions.dispatchUnrec(articleId);
      }
    } else {
      window.location.href = "/login";
    }
  },

  render: function() {
    return (
      <div className="item">
        <button className="recommend" disabled={this.disable} onClick={this.handleButton.bind(this, this.props.info.id)}>
        Recommend
        </button>
        <Modal data={this.props}></Modal>
      </div>
    );
  },
  _onChange: function() {
    this.disable = false;
    this.flag = !this.flag;
    this.setState(RecommendStore.getData());
  }
});


var Modal = React.createClass({
  getInitialState: function() {
    return {
      modalOpen: false
    };
  },
  componentWillMount: function() {
    RecommendStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    RecommendStore.removeChangeListener(this._onChange);
  },
  handleButton: function() {
    RecActions.dispatchAllRecs(this.props.data.info.id);
  },
  openModal: function() {
    this.setState({modalOpen: true});
  },
  closeModal: function() {
    this.setState({modalOpen: false});
  },
  render: function() {
    console.log(this.state);
    if (this.props.modalOpen) {
      return (
        <div>
        {this.state.all}
        </div>
      );
    } else {
      return (
        <span>
        <button onClick={this.handleButton.bind(this, this.props.data.info.id)}>{this.props.data.info.recommends}</button>
        </span>
      );
    }
  },
  _onChange: function() {
    this.setState(RecommendStore.getData());
  }
})

module.exports = RecommendButton;
