require('babel/register');

var express = require('express'),
    exphbs  = require('express-handlebars'),
	React = require('react/addons'),
	CommentArea = React.createFactory(require('../components/comment-area.jsx'));

var app = express();
app.use(express.static('public'));

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
	var comments = [ 
			{ userName: "Florin enghiular", text: "My first comment", timeStamp: Date.now() },
			{ userName: "Sese riect", text: "My first comment", timeStamp: Date.now() },
			{ userName: "Ovidiu kony", text: "My first comment", timeStamp: Date.now() },
			{ userName: "Media saturn enterprize", text: "My first comment", timeStamp: Date.now() }
			];
			
	var component = CommentArea({ initialComments: comments });
	var result = React.renderToString(component);
	res.render('commentArea', { reactComponents: result, reactData: JSON.stringify(comments) });
});

app.listen(3000);