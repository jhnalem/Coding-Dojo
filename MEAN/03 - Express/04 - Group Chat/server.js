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

var messages = [];

io.sockets.on('connection', function(socket) {
    var userId = socket.id;
    var userName = '';

    socket.on('disconnect', function() {
        io.emit('userDisconnected', userId);
    });

    socket.on('userNameSubmit', function(name) {
        userName = name;
        io.sockets.connected[userId].userName = name;

        var users = [];
        for( var u in io.sockets.connected ) {
            users.push({
                id: u,
                name: io.sockets.connected[u].userName || 'New User'
            });
        }

        socket.emit('userNameResponse', 'success');
        socket.emit('previousMessages', messages);
        io.emit('currentUsers', users);
    });

    socket.on('postMessage', function(message) {
        messages.push([userName, message, userId]);
        io.emit('messagePosted', userName, message);
    });
});
