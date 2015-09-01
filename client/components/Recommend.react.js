var React = require('react');
var RecommendStore = require('../stores/RecommendStore');
var RecActions = require('../actions/RecActions');
var Router = require('react-router');
var Link = Router.Link;
var Modal = require('./Modal.react');
var Follow = require('./Follow.react');

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
    return (
      <div className="des">
      <div className="par wrapper">
      <div className="ation serif">
        <Heart className="recommend" disabled={this.disable} state={this.state} click={this.handleButton.bind(this, this.props.info.id)}/>
        {this.state.num ? <span onClick={this.openModal.bind(this, this.props.info.id)}> {this.state.num} </span> :
          ''}
        <Modal isOpen={this.state.isModalOpen} transitionName="modal-anim">
        <div className="overlay-modal">
          <h3 className="overlay-title"> Recommendations for {this.props.info.title.replace(/_/g, ' ')}</h3>
          <div className="body">
            <RecPerson people={this.state.all}/>
          </div>
          <div className="overlay-x">
          <button className="modal-x"onClick={this.closeModal}> x </button>
          </div>
        </div>
        </Modal>
      </div>
      </div>
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
          <div key={index} className="left-text-align stupid">
            <span className="float-left"><Link to="profile" params={{username: item.user.username}}>
              {item.user.username}
            </Link></span>
            <div className="actions float-right">   <Follow username={item.user.username}/></div>
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

module.exports = RecommendButton;
