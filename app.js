const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {Todo} = require('./todo');
const {User} = require('./user');
const _ = require('lodash');

const index = require('./routes/index');
const users = require('./routes/users');

const router = express.Router();


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

console.log('mongodb connection up');

// var userId = '5a3e86266ba479f0045466b0'

// Todo.find(userId).then(doc => {

// }, ).catch(e => {
//   if (!ObjectID.isValid(userId)) {
//     console.log('ID is not valid\n', e.message);
//   }
// });


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.get('/matejcsok', (req, res) => Todo.find({}, 'text').then(doc => res.send(JSON.stringify(doc))).catch(e => {
    console.log('Shit happens', e)
}));

app.post('/matejcsok', (req, res) => {
    const newTodo = new Todo({
        text: req.body.text
    });
    newTodo.save();
    res.send()
});

// POST/users
app.post('/users', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    let user = new User(body);


    user.save().then((user) => {
        console.log('app.js', user.password);
        res.header('x-auth', user.generateAuthToken()).send(user)
    });

    //return res.header('x-auth', user.generateAuthToken()).send(user)
});

let authenticate = (req, res, next) => {
    let token = req.header('x-auth');

    User.findByToken(token).then(user => {
        if (!user) {
            return Promise.reject();
        }

        req.user = user;
        req.token = token;
        next();
    }).catch(e => res.status(401).send());
};

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user)
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;
