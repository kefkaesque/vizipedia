var React = require('react/addons');
var ReactCSS = React.addons.CSSTransitionGroup;

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

module.exports = Modal;
