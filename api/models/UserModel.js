var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
require("dotenv").config();
const jwt = require('jsonwebtoken');
const UserRole = require('../enums/UserRole');

const SALT = 10;

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name:{
        type: String,
        required: [true, 'Name field is required!'],
        maxlength: 100
    },
    email: {
        type: String,
        required: [true, 'Email field is required!'],
        unique: true 
    },
    username: {
        type: String,
        required: [true, 'Username field is required!'],
        unique: true 
    },
    password: {
        type: String,
        minlength: 8,
        required: [true, 'Password field is required!']
    },
    profile_image: {
        type: String,
        required: false
    },
    phone_number: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: [true, 'Address field is required!'],
        maxlength: 200
    },
    role: {
        type: String,
        enum: UserRole
        
    },
    
    created_date: {
        type: Date,
        default: Date.now
    }

});

// Saving user data
UserSchema.pre('save', function (next) {
    var user = this;
    if(user.isModified('password')) {
        //checking if password field is avilable and modified
        bcrypt.genSalt(SALT, function (err, salt) {
            if (err) return next(err)

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

// For comparing the users entered password with database duing login 
UserSchema.methods.comparePassword = function (candidatePassword, callBack) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return callBack(err);
        callBack(null, isMatch);
    });
};

// For generating token when loggedin
UserSchema.methods.generateToken = function (callBack) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(), process.env.SECRETE);
    
    callBack(null, token);
};

// Validating token for auth routes middleware
UserSchema.statics.findByToken = function (token, callBack) {
    jwt.verify(token, process.env.SECRETE, function (err, decode) {
        // This decode must give user_id if token is valid .ie decode = user_id
        User.findById(decode, function(err, user) {
            if (err) {
                return resizeBy.status(404).json({
                    success: false,
                    message: "Invalid User ID!",
                    data: err 
                });
            }

            callBack(null, user);
        });
    });
};


const User = mongoose.model('User', UserSchema);
module.exports = { User }