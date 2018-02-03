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
mongoose.connect( process.env.MONGODB_URI ||'mongodb://localhost:27017/TodoApp', {useMongoClient: true});

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

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
}));
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


        if (sess.email
            && user[0].email == sess.email
            && sess.password
            && bcrypt.compare(sess.password, user[0].password)) {

            console.log('logged in');
            return User.find({email: sess.email})
                .then(doc => {



                    let todoArray = doc[0].todo.map(item => item.text);
                    res.status(200).send(JSON.stringify(todoArray))
                })
                .catch(e => {
                    console.log('Shit happens', e)
                })
        }else {

            res.status(401).send('Email, vagy a jelszó nem helyes');


            console.log('not logged in');
        }

    }).catch(e => console.log(e));
});



app.post('/deleteTodo/:todo', (req, res) => {
    // Favorite.update( {cn: req.params.name}, { $pullAll: {uid: [req.params.deleteUid] } } )
    console.log(req.session.email);
    console.log(req.params.todo);


    User.updateOne({email: req.session.email},
                    {$pull: {'todo': {'text': req.params.todo}}})
        .then(item => console.log(item))
        .catch(e => console.log(e));


    res.send();
});


// todos sent from front end => save to the db
app.post('/matejcsok', (req, res) => {
    console.log('/matejcsok POST');
    const newTodo = new Todo({
        text: req.body.text
    });

    console.log('EMAIL: ', sess.email);
    console.log('NEW TODO: ', newTodo);

    User.findOneAndUpdate({email: sess.email}, {
        $push: {todo: newTodo}
    }).then(user => console.log(user));

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


    bcrypt.hash(body.password, saltRounds, (e, hash) =>  {
        let user = new User({
            email: body.email,
            password: hash,
        });

        user.save().then(user => console.log(user)).catch(e => console.log(e.message, 'error in email, password'));

    }).catch(e => console.log(e));



    res.send();
});




// user sent from frontend => to save to the db
app.post('/login', (req, res) => {

    const body = _.pick(req.body, ['email', 'password']);
    console.log(body)
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
