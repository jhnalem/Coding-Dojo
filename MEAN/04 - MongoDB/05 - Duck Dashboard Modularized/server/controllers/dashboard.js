var mongoose = require('mongoose');
var Duck     = mongoose.model('Duck');

module.exports = {
    index: function(request, response) {
        // Displays all of the duck.
        var context = {
            ducks: []
        };

        var allDucks = [];

        Duck.find({}, function(error, ducks) {
            if( error ) {
                console.error(error);
                response.render("index");
            } else {
                context.ducks = ducks;
                response.render("index", context);
            }
        });
    },

    new: function(request, response) {
        // Displays a form for making a new duck.
        response.render("new");
    },

    create: function(request, response) {
        // Should be the action attribute for the form in the above route (GET '/duck/new').
        var duck = new Duck();
        duck.name = request.body.name;
        duck.color = request.body.color;

        duck.save(function(error) {
            if( error ) {
                // response.redirect('/duck/new');
                response.send("Something went wrong! " + error);
            } else {
                response.redirect('/');
            }
        });
    },

    show: function(request, response) {
        // Displays information about one duck.
        Duck.findOne({_id: request.params.id}, function(error, duck) {
            if( error ) {
                response.send("Something went wrong! " + error);
            } else {
                response.render('show', {duck: duck});
            }
        });
    },

    edit: function(request, response) {
        // Should show a form to edit an existing duck.
        Duck.findOne({_id: request.params.id}, function(error, duck) {
            if( error ) {
                response.send("Something went wrong! " + error);
            } else {
                response.render('edit', {duck: duck});
            }
        });
    },

    update: function(request, response) {
        // Should be the action attribute for the form in the above route (GET '/duck/:id/edit').

        Duck.findOne({_id: request.params.id}, function(error, duck) {
            if( error ) {
                response.send("Something went wrong! " + error);
            } else {
                duck.name = request.body.name;
                duck.color = request.body.color;
                duck.save(function(err) {
                    if( err ) {
                        response.send("Something went wrong! " + err);
                    } else {
                        response.redirect('/ducks/' + request.params.id + '/edit');
                    }
                });
            }
        });
    },

    destroy: function(request, response) {
        // Should delete the duck from the database by ID.

        Duck.remove({_id: request.params.id}, function(err){
            if( err ) {
                response.send("Something went wrong! " + err);
            } else {
                response.redirect('/');
            }
        });
    }
};
