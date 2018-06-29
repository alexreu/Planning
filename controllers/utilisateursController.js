/*controller pour les utilisateurs */
var mongoose = require('mongoose');

var utilisateur = require("../models/personnes");

var utilisateursController = {};

utilisateursController.create = function(req, res){
    res.render("../views/planning/addPerson");
}; 

//enregistrement des personnes
utilisateursController.save = function(req, res){
    var personne = new utilisateur(req.body);

    personne.save(function(err){
        if(err){
            console.log(err);
            res.render("../views/planning/addPerson");
        } else{
            console.log("creation personne OK");
            res.redirect("/personne");
        } 
    });
};

// //Liste les utilisateurs
utilisateursController.list = function(req, res) {
    utilisateur.find({}).exec(function(err, personnes){
        if(err){
            console.log('Error : ', err);
        }else{
            res.render("../views/planning/personne",{personnes:personnes} );
        } 
    });
};

//------------------------A faire
//edition un utilisateur  par son id
utilisateursController.edit = function(req, res) {
    console.log(req.body.task_id);
    taches.findOneAndUpdate(req.body.task_id, {
        $set: {
            nom: req.body.update_nom,
            prenom: req.body.update_prenom,
            mobile : req.body.update_mobile
        }
    }, function (err, personnes) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/personne");
        }
    });
};

//fonction supprimer un utilisateur
utilisateursController.delete = function(req, res){
    var id= req.params.id;
    taches.findOneAndDelete(id, function (err) {
        if(err){
            console.log("error de suppression")
        }else {
            res.redirect("/");
        }
    })
}

//export du module
module.exports = utilisateursController;






