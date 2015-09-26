require('babel/register');

var express = require('express'),
    exphbs  = require('express-handlebars'),
	React = require('react/addons'),
	CommentArea = React.createFactory(require('../components/comment-area.jsx'));

var app = express();
app.use(express.static('views'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
	var result = React.renderToString(CommentArea({}));
	res.render('index', {
		layout: false,
		reactComponents: result
	});
});

app.listen(3000);