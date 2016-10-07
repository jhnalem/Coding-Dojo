var path       = require("path");
var express    = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.listen(8000);
