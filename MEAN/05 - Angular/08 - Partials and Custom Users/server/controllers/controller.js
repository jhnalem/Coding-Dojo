var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {
    index: function(request, response) {

        response.render('index', {});
    }
};
