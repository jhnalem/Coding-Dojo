var mongoose = require('mongoose');
var Person     = mongoose.model('Person');

module.exports = {
    index: function(request, response) {
        Person.find({}, function(error, persons) {
            response.send(error || persons);
        });
    },

    new: function(request, response) {
        var person = new Person();
        person.name = request.params.name;
        person.save(function(error) {
            if( error ) {
                response.send("Something went wrong! " + error);
            } else {
                response.redirect('/');
            }
        });
    },

    show: function(request, response) {
        Person.findOne({name: request.params.name}, function(error, person) {
            response.send(error || person);
        });
    },

    destroy: function(request, response) {
        Person.remove({name: request.params.name}, function(error){
            if( error ) {
                response.send("Something went wrong! " + error);
            } else {
                response.redirect('/');
            }
        });
    }
};
