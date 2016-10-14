(function() {
    'use strict';

    var bcrypt   = require('bcryptjs');
    var mongoose = require('mongoose');
    var User     = mongoose.model('User');

    module.exports = {
        register: _register,
        login: _login,
        get: _getUser
    };

    function _getUser(request, response) {
        User.findById(request.params.id, function(error, data) {
            response.json({
                error: error,
                data: data
            });
        });
    }

    function _register(request, response) {
        User.create(request.body, function(error, data) {
            response.json({
                error: error,
                data: data
            });
        });
    }

    function _login(request, response) {
        User.findOne({email: request.body.email}, function(error, data) {
            var returnError = null,
                returnData  = null;

            if( error ) {
                returnError = error;

            } else if( !data ) {
                returnError = 'EMAIL NOT FOUND';

            } else {
                if( bcrypt.compareSync(
                        request.body.password,
                        data.password) ) {
                    returnData = data;

                } else {
                    returnError = 'WRONG PASSWORD';
                }

            }

            response.json({
                error: returnError,
                data: returnData
            });
        });
    }

})();
