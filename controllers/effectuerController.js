var mongoose = require('mongoose');

var effectuer = require("../models/effectuer");
var taches = require("../models/taches");
var personnes = require("../models/personnes");

var effectuerController = {};

var personnesList;
var tachesList;

// fonction permettant de liste toutes les taches avec le nom des personnes qui l'effectue
effectuerController.list = function(req, res){
    effectuer.find({}).
    populate('id_tache').
    populate('id_personne').
    exec(function (err, result) {
        if(err){
            console.log("error");
        }else {
            res.render("../views/effectuer/effectuer", {
                data: result,
                personnes: personnesList,
                taches: tachesList,
            });
        }
    })
};

// récuperation de la liste des personnes pour la liste déroulante
personnes.find({}).exec(function (err, personnes) {
    if(err){
        console.log("error")
    } else {
        personnesList = personnes;
    }
});

// recuperation des taches pour la liste déroulante
taches.find({}).exec(function (err, taches) {
    if(err){
        console.log("error")
    }else {
        tachesList = taches;
    }
});

// fonction qui ajout une tache à effectuer
effectuerController.add = function(req, res){
    var tacheEffectuer = new effectuer(req.body);
    console.log(tacheEffectuer);
    tacheEffectuer.save(function (err) {
        if(err){
            console.log("error")
        }else {
            console.log("ajout réussi");
            res.redirect('/effectuer');
        }
    })
};

// fonction suppression tache à effectuer
effectuerController.del = function(req, res){
    var id = req.params.id;
    console.log(id);
    effectuer.findByIdAndDelete(id, function (err) {
        if(err){
            console.log("erreur lors de la suppression");
        }else {
            res.redirect('/effectuer');
        }
    });
};
module.exports = effectuerController;
