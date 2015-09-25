var React = require('react'),
	_ = require('underscore'),
	moment = require('moment'),
	CommentEditor = require('./comment-editor.jsx');

var CommentEntry = React.createClass({
	render: function() {
		var c = this.props.comment;
		var userContent = <small><b><a href="/prfoile/1">{c.userName}</a></b></small>								
		var commentText = <small className="commentText">{c.text}</small>
		var btn = <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
		var commentContainer = <div className="media-body btn-block">{userContent} {commentText}{btn}</div>	
		var date = <small style={{color: '#aaa'}}>{moment(c.timeStamp).format('llll')}</small>
		return <div key={this.props.index}>{commentContainer}{date}<br/></div>		
	}
});

var CommentList = React.createClass({
	render: function () {
		var elements = this.props.comments.map((c, index) => { 			
			return <CommentEntry comment={c} index={index} />
		}); 
		return <div className="comment-background">{elements}</div>
	}
});

module.exports = React.createClass({
	getInitialState: function() {
		return { comments: [ 
			{ userName: "Florin enghiular", text: "My first comment", timeStamp: Date.now() },
			{ userName: "Sese riect", text: "My first comment", timeStamp: Date.now() },
			{ userName: "Hovidiu kony", text: "My first comment", timeStamp: Date.now() },
			{ userName: "Media saturn enterprize", text: "My first comment", timeStamp: Date.now() }
			] };
	},
	handleSubmit: function(text) {
		var newComments = this.state.comments.concat([{ text: text, timeStamp: Date.now(), userName: "John Doe" }]);		
		this.setState({ comments: newComments });
	},
	render: function() {
		return (
				<div className="panel panel-body">
					<CommentList comments={this.state.comments} />
					<CommentEditor onCommentSubmit={this.handleSubmit} />
				</div>
			);
	}
})