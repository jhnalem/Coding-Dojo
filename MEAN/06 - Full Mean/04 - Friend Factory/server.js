var path       = require("path");
var express    = require('express');
var bodyParser = require('body-parser');

var app = express();

process.env['APPROOT'] = __dirname;

app.use(bodyParser.json());
app.use(express.static(path.join(process.env['APPROOT'], 'bower_components')));
app.use(express.static(path.join(process.env['APPROOT'], 'client')));

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.listen(8000);
