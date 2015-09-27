require('babel/register');

var express = require('express'),
    exphbs  = require('express-handlebars'),
	React = require('react/addons'),
	bodyParser = require('body-parser'),
	CommentArea = React.createFactory(require('../components/comment-area.jsx'));

var app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');

var comments = [ 
			{ userName: "Bob", text: "My first comment", timeStamp: Date.now() },
			{ userName: "James", text: "My first comment", timeStamp: Date.now() },
			{ userName: "Peter", text: "My first comment", timeStamp: Date.now() },
			{ userName: "Mary", text: "My first comment", timeStamp: Date.now() }
			];
			
app.get('/', function(req, res) {
	var component = CommentArea({ initialComments: comments });
	var result = React.renderToString(component);
	res.render('commentArea', { reactComponents: result, reactData: JSON.stringify(comments) });
});

app.post('/comment', function(req, res) {
	comments.push({ userName: "John Doe", timeStamp: Date.now(), text: req.body.text });
	return res.redirect("/");
});

app.listen(3000);