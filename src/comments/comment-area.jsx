var React = require('react'),
	_ = require('underscore'),
	CommentEditor = require('./comment-editor.jsx');

var CommentList = React.createClass({
	render: function () { 
		var elements = this.props.comments.map((c, index) => { 
			return <div key={index}>{c}</div>
		});
		return <div className="comment-background">{elements}</div>
	}
});

module.exports = React.createClass({
	getInitialState: function() {
		return { comments: ["one", "two", "three", "four", "five"]}
	},
	handleSubmit: function(text) {
		var newComments = this.state.comments.concat([text]);
		var shuffled = _.shuffle(newComments);
		this.setState({ comments: shuffled });
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