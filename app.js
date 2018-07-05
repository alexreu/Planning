var mongoose = require('mongoose');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

// Require Mongoose et connection à la bdd
mongoose.connect("mongodb://localhost/planning")
    .then (() => console.log('Connexion BDD OK'));

var db = mongoose.connection;

mongoose.Promise = global.Promise;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// utilisation des sessions
app.use(session({
    // secret concat avec le password pour + de sécuriter
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

// route qui affiche les  tâches et les differentes actions possibles
var taches = require('./routes/taches');
app.use('/taches', taches);

// route qui affiche les personnes et les différentes actions possibles
var personnes = require('./routes/personnes');
app.use('/personnes',personnes);

// route qui affiches les tâches à effectuer avec les differentes actions possibles
var effectuer = require('./routes/effectuer');
app.use('/', effectuer);

// route qui affiche le backoffice /!\ uniquement pour les admin
var users = require('./routes/user');
app.use('/admin', users);

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
