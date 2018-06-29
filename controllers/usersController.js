/*controller pour les utilisateurs */
var mongoose = require('mongoose');

var utilisateur = require("../models/personnes");

var usersController = {};

usersController.create = function(req, res){
    res.render("../views/planning/addPerson");
}; 

//enregistrement des personnes
usersController.save = function(req, res){
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
usersController.list = function(req, res) {
    utilisateur.find({}).exec(function(err, personnes){
        if(err){
            console.log('Error : ', err);
        }else{
            res.render("../views/planning/personne",{personnes:personnes} );
        } 
    });
};

//export du module
module.exports = usersController;



// //Affiche 1 legume par son id
// usersController.show = function(req, res) {
//     Legume.findOne({_id:req.params.id}).exec(function(err, legume){
//         if(err){
//             console.log('Error : ', err);
//         }else{
//             res.render("../views/legume/show",{legume:legume});
//         } 
//     });
// };

//redirection à la page de creation de legume




// //edition d'un legume par son id
// legumeController.edit = function(req, res){
//     var legume = new Legume(req.body);

//     Legume.findOne({_id:req.params.id}).exec(function(err, legume){
//         if(err){
//             console.log("Error ", err);
//         } else{
//             res.render("../views/legume/edit",{legume: legume} );
//         } 
//     });
// };

// //gestion de l'edition dun legume
// legumeController.update = function(req, res){
//     Legume.findByIdAndUpdate(req.params.id,{ $set :{nom: req.body.nom, prix: req.body.prix} },{new: true}, function (err, legume){

//         if (err){
//             console.log(err);
//             res.render("../views/legume/edit",{legume:req.body} );
//         } 
//         res.redirect("/legumes/show/" + legume._id);
        
//     });
// };

