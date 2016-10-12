(function() {
    'use strict';

    var fs = require('fs');
    var path = require('path');
    var mongoose = require('mongoose');

    var modelsPath = path.join(__dirname, '../models/');

    var databaseName = 'meanFriends';
    var dbURI = 'mongodb://localhost/' + databaseName;

    mongoose.connect(dbURI);

    // Successful connection
    mongoose.connection.on('connected', function() {
        console.log('Mongoose default connection open to ' + dbURI);
    });

    // Connection throws an error
    mongoose.connection.on('error', function(err) {
        console.error('Mongoose default connection error: ' + err);
    });

    // Connection disconnected
    mongoose.connection.on('disconnected', function() {
        console.log('Mongoose default connection disconnected');
    });

    // Node process ended -> close Mongoose connection
    process.on('SIGINT', function() {
        mongoose.connection.close(function() {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });

    fs.readdirSync(modelsPath).forEach(function(file) {
        if( path.extname(file) === '.js' ) {
            require(path.join(modelsPath + file));
        }
    });
})();
