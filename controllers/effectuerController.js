var mongoose = require('mongoose');

var effectuer = require("../models/effectuer");

var effectuerController = {};

// fonction permettant de liste toutes les taches avec le nom des personnes qui l'effectue
effectuerController.list = function(req, res){
    effectuer.find({}).
    populate('id_tache').
    populate('id_personne').
    exec(function (err, result) {
        console.log(typeof result[2].id_tache);
        if(err){
            console.log("error");
        }else {
            console.log("resultat : " + result[2].id_tache);
            res.render("../views/effectuer/effectuer", {data: result});
        }
    })
};

effectuerController.listX = function(req, res){
    effectuer.find().
    populate('id_tache').
    populate('id_personne').
    exec(function (err, result) {
        console.log("je suis result: ", result);
    })
};

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

module.exports = effectuerController;
