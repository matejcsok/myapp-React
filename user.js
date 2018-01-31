const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');


var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate: [{
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email!'
        }]
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    todo: [{
        text: {
            type: String,
            required: false,
            minlength: 1,
            trim: true
        },
        completed: {
            type: Boolean,
            default: false
        },
        completedAt: {
            type: Number,
            default: null
        }
    }]

});




const User = mongoose.model('User', UserSchema);
module.exports = {User};