(function() {
    'use strict';

    var mongoose = require('mongoose');
    var User     = mongoose.model('User');

    module.exports = {
        login: _login,
        register: _register
    };

    function _login(request, response) {
        if( !request.body.email || !request.body.password ) {
            var errors = {};
            if( !request.body.email ) {
                errors.email = {
                    message: 'You must enter an email'
                };
            }

            if( !request.body.password ) {
                errors.password = {
                    message: 'You must enter a password'
                };
            }
            response.json({
                error: {
                    errors: errors
                }
            });

        } else {
            User.findOne({
                email: request.body.email

            }, function(error, data) {
                var res = {};

                if( error ) {
                    res.error = error;

                } else if( data && data.checkPassword(request.body.password) ) {
                    res.user = data;
                    res.success = 'You have successfully logged in!';

                } else {
                    res.error = {
                        errors: {
                            email: {
                                message: 'Incorrect email or password.'
                            }
                        }
                    };
                }

                response.json(res);
            });
        }
    }

    function _register(request, response) {
        if( request.body.password === request.body.confirmPassword ) {
            User.create(request.body, function(error, user) {
                var res = {};

                if( error ) {
                    if( error.code === 11000 ) {
                        res.error = {
                            errors: {
                                email: {
                                    message: 'The email you entered is already in use.'
                                }
                            }
                        }
                    } else {
                        res.error = error;
                    }
                } else {
                    res.user = user;
                    res.success = 'Successfully created your account!';
                }

                response.json(res);
            });

        } else {
            response.json({
                error: {
                    errors: {
                        confirmPassword: {
                            message: 'The passwords do not match.'
                        }
                    }
                }
            })
        }
    }

})();
