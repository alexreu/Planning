//quelles technos? pourquoi? 
//Node JS car seul langage pour coder le back end en javascript

var mongoose = require('mongoose');
var user = require('../models/user');
var bcrypt = require('bcrypt'); // module qui permet de hasher le mot de passe avant l'envoi en BDD
var session = require('express-session');
var fs = require('fs');

var userController = {};

// fonction qui fait un renvoit sur la page addUsers
userController.ajout = function(req, res){
    res.render("../views/users/addUsers");
};

// fonction qui fait un renvoit sur la page index(page de login admin)
userController.index = function(req, res){
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth()+1;
    var year = today.getFullYear();
    var todayDate = day + ' - ' + month + ' - ' + year;
    res.render('../views/users/index', {
        username: req.session.userName,
        success: req.session.success,
        date: todayDate,
    });
    // req.session.success = "";
    // console.log(req.session.success);
};


// fonction qui fait un rendu sur la page login
userController.login = function(req, res){
    res.render('../views/users/login', {
        error: req.session.error,
    })
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

// ajout d'un admin en BDD (création d'un admin pour pouvoir se connecter en tant qu'admin)
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
                 res.redirect('/admin');
             }else {
                 console.log("error =>", err)
             }
         })
     }
};

//fonction qui récupère le username et le password et qui  les compare avec ce qu'il y'a en bdd
userController.auth = function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  user.findOne({username: username}).exec(function (err, user) {
      if(!err && user){
          bcrypt.compare(password, user.password, function(err, result){
              if (result === true){
                  req.session.userId = user._id;
                  req.session.userName = user.username;
                  req.session.date = new Date();
                  req.session.success = 'Connexion Reussie';
                  var dataLog = 'utilisateur : ' + req.session.userName + ' -- date : ' + req.session.date + '\r\n';
                  console.log(dataLog);
                  fs.appendFile('./log/log-connex-admin.txt', dataLog, 'utf8', function (err) {
                      if(!err){
                          console.log('log sauvegarder')
                      }else {
                          console.log('error =>', err);
                      }
                  });
                  //console.log(req.session.userName);
                  res.redirect('/admin/index');
              }else {
                  res.redirect('/admin');
              }
          })
      }else {
          req.session.error = 'Mot de passe ou nom d\'utilisateur incorrect';
          console.log("error =>", err);
          return res.redirect('/admin');
      }

  })
};

// fonction qui permet de destroy la session pour logout
userController.logOut = function(req, res){
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

// module qui permet d'exporter le Controller user
module.exports = userController;