(function() {
    'use strict';

    var mongoose = require('mongoose');
    var User     = mongoose.model('User');

    mongoose.Promise = global.Promise;

    module.exports = {
        create: _create,
        remove: _remove,
        get: _getAllUsers
    };

    function _create(request, response) {
        User.create(request.body)
            .then(function(data) {
                response.json({
                    user: data
                });
            }).catch(function(error) {
                var res = {};

                if( error.code === 11000 ) {
                    res.error = {
                        errors: {
                            name: {
                                message: 'This user aleady exists.'
                            }
                        }
                    }

                } else {
                    res.error = error;
                }

                response.json(res);
            });
    }

    function _remove(request, response) {
        User.findByIdAndRemove(request.params.id)
            .exec()
            .then(function() {
                response.json({})
            })
            .catch(function(error) {
                response.json({
                    error: error
                });
            });
    }

    function _getAllUsers(request, response) {
        User.find()
            .sort('-_id')
            .exec()
            .then(function(data) {
                response.json({
                    users: data
                });
            })
            .catch(function(error) {
                response.json({
                    error: error
                });
            });
    }

})();
