var controller = require('../controllers/api.js');

var namespace = '/';

module.exports = function(app) {
    app.get('/', function(req, res) {
        controller.index(req, res);
    });

    app.get(namespace + 'new/:name/', function(req, res) {
        controller.new(req, res);
    });

    app.get(namespace + 'remove/:name/', function(req, res) {
        controller.destroy(req, res);
    });

    app.get(namespace + ':name/', function(req, res) {
        controller.show(req, res);
    });
};
