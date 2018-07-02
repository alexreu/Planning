/*controller pour les utilisateurs */
var mongoose = require('mongoose');

var utilisateur = require("../models/personnes");

var utilisateursController = {};

utilisateursController.create = function(req, res){
    res.render("../views/personnes/addPerson");
}; 

//enregistrement des personnes
utilisateursController.save = function(req, res){
    var personne = new utilisateur(req.body);
    personne.save(function(err){
        if(err){
            console.log(err);
            res.render("../views/personnes/addPerson");
        } else{
            console.log("creation personne OK");
            res.redirect("/personnes");
        } 
    });
};

// //Liste les utilisateurs
utilisateursController.list = function(req, res) {
    utilisateur.find({}).exec(function(err, personnes){
        if(err){
            console.log('Error : ', err);
        }else{
            res.render("../views/personnes/personne",{personnes:personnes} );
        } 
    });
};

//------------------------A faire
//edition un utilisateur  par son id
utilisateursController.edit = function(req, res) {
    var id = req.body.person_id;
    var name = req.body.update_name;
    var surname = req.body.update_surname;
    var number = req.body.update_number;
    utilisateur.findByIdAndUpdate(id, {
        $set: {
            nom: name,
            prenom: surname,
            mobile: number,
            //status: req.body.update_status
        }
    }, {new: true}, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.redirect("/personnes");
        }
    });
};

//------------------------A faire
//fonction supprimer un utilisateur
utilisateursController.delete = function(req, res){
    var id = req.params.id;
    var condition =
    console.log(id);
    utilisateur.findByIdAndRemove(id, function (err) {
        if(err){
            var test = "error: utilisateursController.delete";
            //console.log(message);
            res.redirect("/personnes");
        }else {
            res.redirect("/personnes");
        }
    })
};

//export du module
module.exports = utilisateursController;






