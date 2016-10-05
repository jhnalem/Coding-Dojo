var path       = require("path");
var express    = require('express');
var bodyParser = require('body-parser');
var session    = require('express-session');

var app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.static(path.join(__dirname, "./static")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret: 'secretkey'}));

app.get('/', function(request, response) {
    response.render("index");
});

app.get('/results', function(request, response) {
    response.render("results", request.session.post);
});

app.post('/result', function(request, response) {
    var post = request.body;

    request.session.post = post;

    response.redirect('/results');
});

app.listen(8000, function() {
    console.log("listening on port 8000");
});
