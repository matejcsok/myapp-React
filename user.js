const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const passportLocalMongoose = require('passport-local-mongoose');

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

});


UserSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email'])
};

UserSchema.methods.generateAuthToken = function () {
    let user = this;
    let access = 'auth';
    let token = jwt
        .sign({_id: user._id.toHexString(), access}, 'abc123')
        .toString();

    console.log(tokens)
    user.tokens.push({access, token});
    console.log(tokens)
    user.save();
    return token
};

UserSchema.statics.findByToken = function (token) {
    let User = this;
    let decoded;


    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (e) {
        return Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

UserSchema.pre('save', function (next) {
    var user = this;

    if (user.isModified('password')) {

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                console.log(user.password)
            })
        });


        next();
    } else {
        next();
    }


});



const User = mongoose.model('User', UserSchema);
module.exports = {User};