var mongoose = require('mongoose');

var effectuer = require("../models/effectuer");
var taches = require("../models/taches");
var personnes = require("../models/personnes");
var tache = require("../controllers/tachesControllers");

var effectuerController = {};

var personnesList;

// fonction permettant de liste toutes les taches avec le nom des personnes qui l'effectue
effectuerController.list = function(req, res){
    effectuer.find({}).
    populate('id_tache').
    populate('id_personne').
    exec(function (err, result) {
        if (!err) {
            res.render("../views/effectuer/effectuer", {
                data: result,
                personnes: personnesList,
            });
        } else {
            console.log("error");
        }
    })
};

// récuperation de la liste des personnes pour la liste déroulante
var personnesList = personnes.find({})
personnesList.exec(function (err, personnes) {
    if(err){
        console.log("error")
    } else {
        personnesList = personnes;
    }
});

// recuperation des taches pour la liste déroulante

effectuerController.taches = function(req, res){
    var tachesList = taches.find({})
    tachesList.exec(function (err, taches) {
        if(err){
            console.log("error")
        }else {
            console.log("on liste les taches");
            res.render("../views/effectuer/taches", {
                taches: taches
            });
        }
    });
};

// fonction qui ajout une tache à effectuer
effectuerController.add = function(req, res){
    var tacheEffectuer = new effectuer(req.body);
    //console.log(tacheEffectuer.id_tache);
    tacheEffectuer.save(function (err) {
        if(err){
            console.log("error")
        }else {
            console.log("ajout réussi");
            //taches affecter
            tache.affecter(tacheEffectuer.id_tache[0]);
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
            res.header("Cache-Control", "private no-cache no-store must-revalidate");
            res.redirect('/effectuer');
        }
    });
};


module.exports = effectuerController;
