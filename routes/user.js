var express = require('express');
var router = express.Router();
var users = require('../controllers/usersController');

function requireLogin (req, res, next) {
    if (req.session && req.session.userId) {
        next();
    }else {
        var err = new Error('error 404');
        err.status = 401;
        res.redirect('/admin');
    }
};

router.get('/', users.login);

router.get('/index', requireLogin, users.index);

router.get('/logout', users.logOut);

router.get('/addUser', requireLogin, users.ajout);

router.post('/login', users.auth);

router.post('/add', users.add);


module.exports = router;