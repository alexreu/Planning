var mongoose = require('mongoose');
var user = require('../models/user');
var bcrypt = require('bcrypt');
var session = require('express-session');

var userController = {};

// fonction qui fait un rendu sur la page addUsers
userController.ajout = function(req, res){
    res.render("../views/users/addUsers");
};

// fonction qui fait un rendu sur la page index
userController.index = function(req, res){
    res.render('../views/users/index');
};

// hash du password avant l'ajout en bdd
user.schema.pre('save', function(next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if(err){
            next(err);
        }
        user.password = hash;
        user.passwordConfirmation = user.password;
        next();
    })
});

// ajout d'un admin en base
userController.add = function (req, res) {
    // recuperation des variable dans le body
     var username = req.body.username;
     var password = req.body.password;
     var confimPassword = req.body.password;

    // si les varibles sont définis alors on créer un new user
     if (username && password && confimPassword){
         var userData = new user ({
             username: username,
             password: password,
             passwordConfirmation: confimPassword
         });
        // on sauvegarde le new user en bdd
         userData.save(function (err) {
             if(!err){
                 res.redirect('/admin/login');
             }else {
                 console.log("error =>", err)
             }
         })
     }
};

// fonction qui fait un rendu sur la page login
userController.login = function(req, res){
    res.render('../views/users/login')
};

//fonction qui recupere le username et le password et qui compare
// avec ce qu'il y'a en bdd
userController.auth = function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  user.findOne({username: username}).exec(function (err, user) {
      if(!err && user){
          bcrypt.compare(password, user.password, function(err, result){
              if (result === true){
                  req.session.userId = user._id;
                  res.redirect('/admin/index');
              }else {
                  res.redirect('/admin');
              }
          })
      }else {
          console.log("error =>", err);
          return res.redirect('/admin');
      }

  })
};

// fonction qui permet de destroy la session pour logout
userController.logOut = function(req, res){
    console.log(req.session);
    if (req.session){
        // supprimer la session
        req.session.destroy(function(err){
            if(!err){
                res.redirect('/')
            }else {
                console.log("error => ", err);
            }
        })
    }
};



module.exports = userController;