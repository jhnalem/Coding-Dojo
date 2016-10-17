(function() {
    'use strict';

    var users    = require('../controllers/users.js');
    var messages = require('../controllers/messages.js');

    module.exports = function(app) {
        app.post('/login', users.login);
        app.post('/register', users.register);
        app.get('/allMessages', messages.getMessages);
        app.post('/postMessage', messages.postMessage);
        app.post('/postComment', messages.postComment);
    };
})();
