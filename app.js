var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mongoose = require('mongoose')
const {Todo} = require('./todo')

var index = require('./routes/index');
var users = require('./routes/users');

var router = express.Router();


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

console.log('mongodb connection up')

var userId = '5a3e86266ba479f0045466b0'

Todo.findById(userId).then(doc => {

},).catch(e => {
  if (!ObjectID.isValid(userId)) {
      console.log('ID is not valid\n',e.message);
  }
});


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.get('/matejcsok', (req, res) =>Todo.findById(userId).then(doc => res.send(JSON.stringify(doc))))

app.post('/matejcsok', (req, res) => {
  console.log(req.body.text)
  res.send()
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
