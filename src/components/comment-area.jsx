var React = require('react'),
	_ = require('underscore'),
	moment = require('moment'),
	CommentEditor = require('./comment-editor.jsx');

var CommentEntry = React.createClass({
	onCloseClick: function() {
		this.props.onClosed(this.props.comment);
	},
	render: function() {
		var c = this.props.comment;
		var userContent = <small><b><a href="/prfoile/1">{c.userName}</a></b></small>								
		var commentText = <small className="commentText">{c.text}</small>
		var btn = <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.onCloseClick}><span aria-hidden="true">×</span></button>
		var commentContainer = <div className="media-body btn-block">{userContent} {commentText}{btn}</div>	
		var date = <small style={{color: '#aaa'}}>{moment(c.timeStamp).format('llll')}</small>
		return <div>{commentContainer}{date}<br/></div>
	}
});

var CommentList = React.createClass({
	onCommentRemoved: function(comment) {
		this.props.onCommentRemoved(comment);
	},
	render: function () {
		var elements = this.props.comments.map(function(c, index) { 			
			return <CommentEntry key={index} comment={c} onClosed={this.onCommentRemoved} />
		}.bind(this));
		return <div className="comment-background">{elements}</div>
	}
});

module.exports = React.createClass({ displayName: "Comment Area",
	getInitialState: function() {
		return { comments: this.props.initialComments };
	},
	fetchCurrentIp: function() {
		$.get('http://jsonip.com', function (json) {
   			 this.setState({ip: json.ip});
		}.bind(this));
		console.log('Fetching current ip...')
	},
	componentDidMount: function () {
		this.fetchCurrentIp();
	},
	handleSubmit: function(text) {
		var newComments = this.state.comments.concat([{ text: text, timeStamp: Date.now(), userName: "John Doe" }]);		
		this.setState({ comments: newComments });
	},
	onCommentRemoved: function(comment) {
		var index = this.state.comments.indexOf(comment);
		if (index > -1) {
			this.state.comments.splice(index, 1);
			this.setState({ comments: this.state.comments });
		}
	},
	render: function() {
		return (
				<div className="panel panel-body">
					<CommentList comments={this.state.comments} onCommentRemoved={this.onCommentRemoved} />
					<CommentEditor onCommentSubmit={this.handleSubmit} />
					<div>Your IP address is: {this.state.ip}</div>
				</div>
			);
	}
})