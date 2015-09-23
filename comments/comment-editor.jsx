var React = require('react');

module.exports = React.createClass({
	handleSubmit: function (evt) {
		evt.preventDefault();
		var text = React.findDOMNode(this.refs.text).value.trim();
		if (!text) { alert('NOPE'); return; }

		this.props.onCommentSubmit(text);

		React.findDOMNode(this.refs.text).value = '';
	},
	render: function () {
		return (
			<form className="commentForm" onSubmit={this.handleSubmit}>
		        <input type="text" placeholder="Say something..." ref="text" />
		        <input type="submit" value="Post" />
      		</form>
			)
	}
})