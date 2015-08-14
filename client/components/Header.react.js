var React = require('react');

var Header = React.createClass({

  handleHeaderSubmit: function(comment) {
    console.log('Submit Button pressed')
    // $.ajax({
    //   url: this.props.url,
    //   dataType: 'json',
    //   type: 'POST',
    //   data: comment,
    //   success: function(data) {
    //     console.log(data);
    //     this.setState({data: data});
    //   }.bind(this),
    //   error: function(xhr, status, err) {
    //     console.error(this.props.url, status, err.toString());
    //   }.bind(this)
    // });
  },
  render: function() {
    return (
      <div className="header">
        <h1>Header</h1>
        <div class="logo">vizipedia</div>
        <HeaderForm onHeaderSubmit={this.handleHeaderSubmit} />
        <div class="menu">
          <LoginButton/> 
          <SignupButton/>
        </div>
      </div>
    )
  }
});

var LoginButton = React.createClass({
  handlePress: function(e) {
    console.log('Login Pressed!')
    // $.ajax({
    //   url: this.props.url,   //   /login
    //   dataType: 'json',
    //   type: 'POST',
    //   data: comment,
    //   success: function(data) {
    //     console.log(data);
    //     this.setState({data: data});
    //   }.bind(this),
    //   error: function(xhr, status, err) {
    //     console.error(this.props.url, status, err.toString());
    //   }.bind(this)
    // });
  },
  render: function() {
    return (
      <div className="loginButton">
        <button onClick={this.handlePress}>
          Login
        </button>
      </div>  
    );
  }
});

var SignupButton = React.createClass({
  handlePress: function(e) {
    console.log('Signup Pressed!')
    // $.ajax({
    //   url: this.props.url, // /signup
    //   dataType: 'json',
    //   type: 'POST',
    //   data: comment,
    //   success: function(data) {
    //     console.log(data);
    //     this.setState({data: data});
    //   }.bind(this),
    //   error: function(xhr, status, err) {
    //     console.error(this.props.url, status, err.toString());
    //   }.bind(this)
    // });
  },
  render: function() {
    return (
      <div className="signupButton">
        <button onClick={this.handlePress}>
          Signup
        </button>
      </div>  
    );
  }
});


var HeaderForm = React.createClass({
  handleSubmit: function(e) {
    console.log('Submit Search!')
    e.preventDefault();
    var text = React.findDOMNode(this.refs.text).value.trim();// get the vaule
    if (!text) {
      return;
    }
    this.props.onHeaderSubmit({text: text});// assign the vaule
    React.findDOMNode(this.refs.text).value = '';// clean the vaule
    return;
  },
  render: function() {
    return (
      <form className="headertForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Search Articles" ref="text" />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

var articleId = 'Cats';

React.render(
  <Header url={"/wiki/"+articleId} />,
  document.getElementById('header')
);

module.exports = Header;