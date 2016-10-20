(function() {
    'use strict';

    var mongoose = require('mongoose');
    var User     = mongoose.model('User');

    mongoose.Promise = global.Promise;

    module.exports = {
        getUser: _findOne,
        getUserById: _findById
    };

    function _findOne(request, response) {
        if( !request.body.name ) {
            response.json({
                error: {
                    errors: {
                        name: {
                            message: 'You must enter your name.'
                        }
                    }
                }
            });
        } else {
            User.findOne(request.body)
                .exec()
                .then(function(data) {
                    if( !data ) {
                        User.create(request.body)
                            .then(function(data) {
                                response.json({
                                    user: data
                                });
                            })
                            .catch(function(error) {
                                response.json({
                                    error: error
                                });
                            });
                    } else {
                        response.json({
                            user: data
                        });
                    }
                })
                .catch(function(error) {
                    response.json({
                        error: error
                    });
                });
        }
    }

    function _findById(request, response) {
        User.findById(request.params.id)
            .populate({path: 'topics'})
            .populate({path: 'posts'})
            .populate({path: 'comments'})
            .exec()
            .then(function(data) {
                response.json({
                    user: data
                });
            })
            .catch(function(error) {
                response.json({
                    error: error
                });
            });
    }

})();
