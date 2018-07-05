//quelles technos? pourquoi? 
//Node JS car seul langage pour coder le back end en javascript

/*controller pour les utilisateurs */
var mongoose = require('mongoose');

var utilisateur = require("../models/personnes");

var utilisateursController = {};

// Fonction  qui permet de renvoyer vers le formulaire de création d'un utilisateur
utilisateursController.create = function(req, res){
    res.render("../views/personnes/addPerson", {error: req.session.error});
}; 

//fonction qui permet l'enregistrement de nouveax utilisateurs
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

// Fonction qui permet d'afficher la liste les utilisateurs
utilisateursController.list = function(req, res) {
    utilisateur.find({}).exec(function(err, personnes){
        if(err){
            console.log('Error : ', err);
        }else{
            res.render("../views/personnes/personne",{personnes:personnes, success:req.session.success } );
            
        } 
    });
};


// Fonction qui permet l'edition un utilisateur identifié par son ID
utilisateursController.edit = function(req, res) {
        //déclaration des variables que l'on veut éditer
        var id = req.body.person_id;// permet de récupérer les données d'une personne pour pouvoir modifier les champs du body (les 3 suivants)
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

//Fonction  qui permet de supprimer un utilisateur identifié par son ID
utilisateursController.delete = function(req, res){
        //"params" permet de passer l'id en paramètre dans l'url pour aller chercher l'élément à supprimer
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

// module qui permet d'exporter le Controller utilisateur
module.exports = utilisateursController;






