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

var counter = 0;

io.sockets.on('connection', function(socket) {
    socket.on('click', function() {
        counter++;
        io.emit('clickResponse', counter);
    });

    socket.on('reset', function() {
        counter = 0;
        io.emit('resetResponse', counter);
    });
});
