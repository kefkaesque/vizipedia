var React = require('react/addons');
var RecommendStore = require('../stores/RecommendStore');
var RecActions = require('../actions/RecActions');
var ReactCSS = React.addons.CSSTransitionGroup;

var RecommendButton = React.createClass({

  disable: false,
  getInitialState: function() {
    return {
      isModalOpen: false
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
    if (!Locals.userid) {
      window.location.href= '/login';
    } else {
      if (this.state.state) {
        RecActions.dispatchUnrec(articleId);
      } else {
        RecActions.dispatchRec(articleId);
      }
    }
  },
  openModal: function(articleId) {
    RecActions.dispatchAllRecs(articleId);
     // {this.state.all[0].user.username}
    this.setState({
      isModalOpen: true
    });
  },
  closeModal: function() {
    this.setState({
      isModalOpen: false
    });
  },
  render: function() {
    console.log(this.state);
    return (
      <div className="item">
       <button onClick={this.openModal.bind(this, this.props.info.id)}>Open modal</button>
        <Heart className="recommend" disabled={this.disable} state={this.state} click={this.handleButton.bind(this, this.props.info.id)}/>
        {this.state.num ? <span> {this.state.num} </span> :
          ''}

        <Modal isOpen={this.state.isModalOpen} transitionName="modal-anim">
          <h3> Recommendations </h3>
          <div className="body">
            <p> this is a modal </p>
            <RecPerson people={this.state.all}/>
          </div>
          <button onClick={this.closeModal}> Close </button>
        </Modal>
      </div>
    );
  },
  _onChange: function() {
    this.disable = false;
    this.setState(RecommendStore.getData());
  }
});

var RecPerson = React.createClass({
  render: function() {
    if (this.props.people) {
      var itemNodes = this.props.people.map(function(item, index) {
        return (
          <div key={index}>
            {item.user.username}
          </div>
        );
      });
    } else {
      itemNodes = '';
    }
    return (
      <div>
        {itemNodes}
      </div>
    );
  }
});

var Heart = React.createClass({
  getInitialState: function() {
    return {
      classes: 'heart',
    }
  },
  getClasses: function() {
    if (this.props.state.state) {
      return this.state.classes + ' filled';
    } else {
      return this.state.classes + ' empty';
    }
  },
  handleClick: function() {

  },
  render: function() {
    var classNames = this.getClasses();
    return React.DOM.svg({
      className: classNames,
      viewBox: "-5 0 69 64",
      onClick: this.props.click
    }, [
      React.DOM.path({
        d: "M30.3,57.8L8.7,37c-0.3-0.2-7.9-7.2-7.9-15.5C0.8,11.3,7,5.2,17.3,5.2c6.1,0,11.7,4.8,14.5,7.5c2.7-2.7,8.4-7.5,14.5-7.5   c10.4,0,16.6,6.1,16.6,16.2c0,8.3-7.6,15.3-7.9,15.6L33.3,57.8c-0.4,0.4-1,0.6-1.5,0.6C31.3,58.4,30.7,58.2,30.3,57.8z"
      })
    ]);
  }
});

var Modal = React.createClass({
  render: function() {
    if (this.props.isOpen) {
      return (
        <ReactCSS transitionName={this.props.transitionName}>
          <div className="modal">
            {this.props.children}
          </div>
        </ReactCSS>
      );
    } else {
      return <ReactCSS transitionName = {this.props.transitionName} />
    }
  }
})

module.exports = RecommendButton;
