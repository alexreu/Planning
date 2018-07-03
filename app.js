var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

// Require Mongoose et connection à la bdd
var mongoose = require('mongoose');
var url = "mongodb://localhost/planning";
mongoose.Promise = global.Promise;
mongoose.connect(url)
    .then (() => console.log('Connexion BDD OK'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// route qui affiche les  taches et les differentes actions possible
var taches = require('./routes/taches');
app.use('/taches', taches);

// route qui affiches les personnes et les differentes actions possibles
var personnes = require('./routes/personnes');
app.use('/personnes',personnes);

// route qui affiches les taches à effectuer avec les differentes actions possible
var effectuer = require('./routes/effectuer');
app.use('/', effectuer);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
