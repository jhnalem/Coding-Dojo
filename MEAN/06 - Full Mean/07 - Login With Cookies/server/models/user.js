(function() {
    'use strict';

    var mongoose = require('mongoose');
    var bcrypt   = require('bcryptjs')

    var UserSchema = new mongoose.Schema({
        firstName: {
            type: String,
            required: [true, 'You must provide your first name.'],
            minlength: [2, 'First name must be atleast two characters long.'],
            trim: true
        },
        lastName: {
            type: String,
            required: [true, 'You must provide your last name.'],
            minlength: [2, 'Last name must be atleast two characters long.'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'You must provide an email.'],
            trim: true,
            unique: true,
            validate: {
                validator: function(value) {
                    var re = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
                    return re.test(value);
                },
                message: "Email is invalid."
            }
        },
        password: {
            type: String,
            required: [true, 'You must provide a password.'],
            minlength: [8, 'Passwords must be at least 8 characters long.'],
            maxlength: [32, 'Passwords cannot be longer than 32 characters.'],
            validate: {
                validator: function(value) {
                    var re = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d$@$!%*?&]{8,32}/;
                    return re.test(value);
                },
                message: "Password failed validation, you must have at least 1 number"
            }
        },
        birthday: {
            type: Date,
            required: [true, 'Please provide your birthday.'],
            trim: true
        }
    }, {timestamps: true});

    UserSchema.methods.encryptPassword = function(password) {
        return bcrypt.hashSync(password, 8);
    };

    UserSchema.pre('save', function(done) {
        this.password = this.encryptPassword(this.password);
        done();
    });

    mongoose.model('User', UserSchema);
})();
