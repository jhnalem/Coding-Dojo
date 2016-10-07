var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');

var models_path = path.join(__dirname, './../models/');

mongoose.connect('mongodb://localhost/people');
fs.readdirSync(models_path).forEach(function(file) {
    if( path.extname(file) === '.js' ) {
        require(models_path + file);
    }
});
