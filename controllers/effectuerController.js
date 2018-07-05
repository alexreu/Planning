//quelles technos? pourquoi? 
//Node JS car seul langage pour coder le back end en javascript


var mongoose = require('mongoose');
var effectuer = require("../models/effectuer");
var taches = require("../models/taches");
var personnes = require("../models/personnes");
var tache = require('../controllers/tachesControllers');

var effectuerController = {};

var personnesList;
var tachesList;

// fonction permettant de lister toutes les taches avec le nom des personnes qui l'effectuent (populate permet de faire la jointure)
effectuerController.list = function(req, res){
    effectuer.find({}).
    populate('id_tache').
    populate('id_personne').
    exec(function (err, result) {
        if (!err) {
            res.render("../views/effectuer/effectuer", {
                data: result, // result correspond à ce que l'on voit en card sur la page d'accueil
                personnes: personnesList,
            });
        } else {
            console.log("error");
        }
    })
};

// récuperation de la liste des personnes pour l'inclure dans la liste déroulante
var personnesList = personnes.find({})
personnesList.exec(function (err, personnes) {
    if(err){
        console.log("error")
    } else {
        personnesList = personnes; //liste déroulante qui fournit les éléments de personnesList
    }
});

// recuperation des taches pour l'inclure dans la liste déroulante

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
taches.find({}).exec(function (err, taches) {
    if(err){
        console.log("error")
    }else {
        tachesList = taches; //liste déroulante qui fournit les éléments de tachesList
    }
});

// fonction qui ajoute une tache à effectuer
effectuerController.add = function(req, res){
    var tacheEffectuer = new effectuer(req.body);
    //console.log(tacheEffectuer.id_tache);
    tacheEffectuer.save(function (err, taches) {
        if(err){
            console.log("error")
        }else {
            console.log("ajout réussi");
            //appel de la fonction qui permet de gérer le statut d'affectation de la tâche (booléen)
            tache.affecter(tacheEffectuer.id_tache[0]);
            res.redirect('/');
        }
    })
};


//fonction d'edition d'une tache à effectuer par l'id
effectuerController.edit = function(req, res){
    //déclaration des variables que l'on veut éditer
    var id = req.body._id; // permet de récupérer les données d'un Effectuer pour pouvoir modifier les champs du body (les 3 suivants)
    var date_debut = req.body.date_debut;
    var date_fin = req.body.date_fin;
    var hour = req.body.hour;
    
    effectuer.findByIdAndUpdate(id,
        {
        $set: {
            date_debut: date_debut,
            date_fin: date_fin,
            hour: hour
        }
    }, function(err){
    
        if(err){
            console.log("Error ", err);
        } else{
            //console.log(effectuer);
            //  renvoi vers une route
            res.redirect("/")
        }
    });
};


// fonction de suppression de la tache à effectuer
effectuerController.del = function(req, res){
    //"params" permet de passer l'id en paramètre dans l'url pour aller chercher l'élément à supprimer
    var id = req.params.id;
    console.log(id);
    effectuer.findByIdAndDelete(id, function (err) {
        if(err){
            console.log("erreur lors de la suppression");
        }else {
            //envoie des consignes à interpréter au navigateur 
            res.header("Cache-Control", "private no-cache no-store must-revalidate");
            res.redirect('/');
        }
    });
};


module.exports = effectuerController;
