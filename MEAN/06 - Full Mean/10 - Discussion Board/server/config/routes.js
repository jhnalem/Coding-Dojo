(function() {
    'use strict';

    var users = require('../controllers/users.js');
    var discussion = require('../controllers/discussions.js');

    module.exports = function(app) {
        app.post('/getUser', users.getUser);
        app.get('/getUserId/:id', users.getUserById);
        app.get('/getTopics', discussion.getTopics);
        app.get('/getTopic/:id', discussion.getTopic);
        app.post('/addTopic/', discussion.addTopic);
        app.post('/addPost', discussion.addPost);
        app.post('/addComment', discussion.addComment);
    };
})();
