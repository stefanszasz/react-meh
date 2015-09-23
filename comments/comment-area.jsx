var React = require('react'),
	CommentEditor = require('./comment-editor.jsx');

var CommentList = React.createClass({
	render: function () {
		var elements = this.props.comments.map(c => { return <div>{c}</div> });
		return <div className="comment-background">{elements}</div>
	}
});

module.exports = React.createClass({
	getInitialState: function() {
		return { comments: ["one", "two", "three"]}
	},
	handleSubmit: function(text) {
		var newComments = this.state.comments.concat([text]);
		this.setState({ comments: newComments });
	},
	render: function() { 
		return (
				<div>
					<CommentList comments={this.state.comments} />
					<CommentEditor onCommentSubmit={this.handleSubmit} />
				</div>
			);
	}
})