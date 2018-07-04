var mongoose = require('mongoose');

var effectuer = require("../models/effectuer");
var taches = require("../models/taches");
var personnes = require("../models/personnes");
var tache = require('../controllers/tachesControllers');

var effectuerController = {};

var personnesList;
var tachesList;

// fonction permettant de liste toutes les taches avec le nom des personnes qui l'effectue
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

// récuperation de la liste des personnes pour la liste déroulante
var personnesList = personnes.find({})
personnesList.exec(function (err, personnes) {
    if(err){
        console.log("error")
    } else {
        personnesList = personnes; //liste déroulante qui fournit les éléments de personnesList
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
            //taches affecter
            tache.affecter(tacheEffectuer.id_tache[0]);
            res.redirect('/');
        }
    })
};


effectuerController.create = function(req, res){
    //console.log('effectuerController.create');
    res.render("../views/effectuer/edit");
}
//edition d'un legume par son id
effectuerController.edit = function(req, res){
    // var legume = new Legume(req.body);
    var id = req.params.id // permet de récupérer les données d'un Effectuer
    //console.log(id);
    effectuer.findById(id).
    populate('id_tache').
    populate('id_personne').
    exec(function(err, effectuer){
        if(err){
            console.log("Error ", err);
        } else{
            //console.log(effectuer);
            //  renvoi vers une route
            res.render("../views/effectuer/edit",{
                effectuer : effectuer   // si fonctionne renvoit la vue avec les élements de légumes préremplis

            } );
        }
    });
};



//edition d'une tâche à effectuer par son id
effectuerController.save = function(req, res) {
    var id = req.body.effectuer_id;
    var name = req.body.nomT;

    effectuer.findByIdAndUpdate(id,
        {
        $set: {
            id_tache:{'nom': name, 'commentaire': com  },
            id_personne:{'nom': nom, 'prenom': prenom },
        }
    })
    .populate('id_tache')
    .populate('id_personne')
    .exec(function (err) {
        console.log("avant le if")
        if (err) {
            console.log("error => " + err);
        } else {
            res.redirect('/');
        }
    });
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
            res.redirect('/');
        }
    });
};


module.exports = effectuerController;
