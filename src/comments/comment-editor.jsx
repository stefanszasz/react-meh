var React = require('react');

module.exports = React.createClass({
	handleSubmit: function (evt) {
		console.log('THIS: ' + this)
		evt.preventDefault();
		var text = React.findDOMNode(this.refs.text).value.trim();
		if (!text) return;

		this.props.onCommentSubmit(text);
		React.findDOMNode(this.refs.text).value = '';
	},
	render: function () {
		return (
			<form className="commentForm" onSubmit={this.handleSubmit}>
		        <input type="text" placeholder="Say something..." ref="text" />
		        <input type="submit" className="btn btn-sm" value="Post" />
      		</form>
			)
	}
})