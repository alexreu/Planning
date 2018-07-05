/*controller pour les utilisateurs */
var mongoose = require('mongoose');

var utilisateur = require("../models/personnes");

var utilisateursController = {};

utilisateursController.create = function(req, res){
    var err = 
    res.render("../views/personnes/addPerson", {error: req.session.error});
}; 

//enregistrement des personnes
utilisateursController.save = function(req, res){

    var personne = new utilisateur(req.body);
    personne.save(function(err){
        if(err){
        req.body.error = 'Echec création utilisateur'
            console.log(err);
            res.render("../views/personnes/addPerson");

        } else{
            console.log("creation personne OK");
            req.session.success = 'Utilisateur créé'
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
            res.render("../views/personnes/personne",{personnes:personnes, success:req.session.success } );
            
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
            req.session.error = 'Echec de la mise à jour'
            console.log(err);
        } else {
            req.session.success = 'Utilisateur mis à jour';
            console.log(result);
            res.redirect("/personnes");
        }
    });
};

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
            req.session.success = 'Utilisateur supprimé';

            res.redirect("/personnes");
        }
    })
};

//export du module
module.exports = utilisateursController;






