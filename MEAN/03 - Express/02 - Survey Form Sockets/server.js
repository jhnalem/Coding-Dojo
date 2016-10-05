var path       = require("path");
var express    = require('express');
var bodyParser = require('body-parser');

var app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.static(path.join(__dirname, "./static")));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(request, response) {
    response.render("index");
});

var server = app.listen(8000);

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {

    socket.on('formSubmission', function(data) {
        var message = 'Your submitted this information: "name: ' + data.name + '", "location: ' + data.location + '", "language: ' + data.language + (data.comment ? '", "comment: ' + data.comment + '".' : '".');

        socket.emit('serverResponse', {response: message});

        socket.emit('randomNumber');
    });
});


