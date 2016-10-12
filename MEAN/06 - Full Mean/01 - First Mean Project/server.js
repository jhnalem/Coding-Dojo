var path       = require("path");
var express    = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './bower_components')));
app.use(express.static(path.join(__dirname, './client/static')));

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.listen(8000);
