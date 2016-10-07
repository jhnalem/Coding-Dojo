var controller = require('../controllers/dashboard.js')

module.exports = function(app) {
    app.get('/', function(req, res) {
        controller.index(req, res);
    });

    app.get('/ducks/new', function(req, res) {
        controller.new(req, res);
    });

    app.post('/ducks', function(req, res) {
        controller.create(req, res);
    });

    app.get('/ducks/:id', function(req, res) {
        controller.show(req, res);
    });

    app.get('/ducks/:id/edit', function(req, res) {
        controller.edit(req, res);
    });

    app.post('/ducks/:id', function(req, res) {
        controller.update(req, res);
    });

    app.get('/ducks/:id/destroy', function(req, res) {
        controller.destroy(req, res);
    });
};
