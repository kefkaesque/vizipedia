$.ajax({
  url: 'comments/test',
  dataType: 'json',
  cache: false,
  success: function(data) {
    console.log(data);
  }.bind(this),
  error: function(xhr, status, err) {
    console.error('error', status, err);
  }.bind(this)
});

/* Hard-coded data */
var data = [
  {author: "Carter", text: "Hey guys"},
  {author: "David", text: "How's it going?"},
  {author: "Patrick", text: "Not bad, making good progress."},
  {author: "Stephen", text: "Good work!"}
];

var CommentBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm />
      </div>
    )
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function (comment) {
      return (
        <Comment author={comment.author}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
        Hello, world! I am a CommentForm.
      </div>
    );
  }
});

var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h2>
          {this.props.author}
        </h2>
        {this.props.children}
      </div>
    )
  }
})

React.render(
  <CommentBox data={data} />, /* Hard-coded data */
  document.getElementById('content')
);