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
const bcrypt = require('bcrypt');
const saltRounds = 10;

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const authentication = require('./authentication');

const index = require('./routes/index');
const users = require('./routes/users');

const router = express.Router();

// setup mongo db connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp', {useMongoClient: true});

console.log('mongodb connection up');


const app = express();


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

app.use(session({secret: 'ssshhhhh'}));
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions

// set routes for react router to use them
app.use('/', index);
app.use('/singup', index);
app.use('/login', index);
app.use('/users', users);
// app.use('/authentication', authentication);

// configure passport
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


// express session
var sess;
app.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/login');
        }
    });

});

// send todos from db to frontend
app.get('/matejcsok', (req, res) => {
    sess = req.session;
    User.find({email: sess.email}).then(user => {

        if (sess.email && user[0].email == sess.email && sess.password && user[0].password == sess.password) {
            console.log('logged in');
            return Todo.find({}, 'text').then(doc => res.end(JSON.stringify(doc))).catch(e => {
                console.log('Shit happens', e)
            })
        }
        console.log('not logged in');
    });
});

// app.post('/matejcsok', (req, res) => {
//     const body = _.pick(req.body, ['email', 'password']);
//     console.log(body);
//
//     User.find({email: sess.email}).then(user => {
//
//         if (user[0].email == sess.email && user[0].password == sess.password) {
//             console.log('logged in');
//             return Todo.find({}, 'text').then(doc => res.end(JSON.stringify(doc))).catch(e => {
//                 console.log('Shit happens', e)
//             })
//         }
//         console.log(' NOT logged in');
//     });
//     res.send()
//
// });


// todos sent from front end => save to the db
app.post('/matejcsok', (req, res) => {
    const newTodo = new Todo({
        text: req.body.text
    });
    newTodo.save();
    res.send()
});

// send all the users from db to frontend
app.get('/username', (req, res) => {

    User.find({}).then(users => {
        res.send(users);
        //console.log(users)

    });
});

app.post('/singup', (req, res) => {

    const body = _.pick(req.body, ['email', 'password']);

    let user = new User(body);

    user.save().then(user => console.log(user));

    res.send();
});


// app.get('/login', (req, res) => {
//     sess = req.session;
//
//
//
// });

// user sent from frontend => to save to the db
app.post('/login', (req, res) => {

    const body = _.pick(req.body, ['email', 'password']);


    // add to session
    sess = req.session;
    sess.email = body.email;
    sess.password = body.password;


    res.send();
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
