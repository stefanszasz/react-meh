var React = require('react'),
	CommentArea = require('../components/comment-area.jsx'),
	ready = require('domready')

ready(function() {
	var node = document.getElementById('comment-area-container');
	React.render(<CommentArea initialComments={commentsData} />, node);
});