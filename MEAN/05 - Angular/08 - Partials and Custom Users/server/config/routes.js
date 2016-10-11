var controller = require('../controllers/controller.js')

module.exports = function(app) {
    app.get('/', function(req, res) {
        controller.index(req, res);
    });
};
