/*controller pour les taches à effectuer*/

//export du module
var mongoose = require('mongoose');
var taches = require('../models/effectuer');

/*controller pour les taches */
var tachesAEffectuerController = {};


// liste des taches à effectuer
tachesAEffectuerController.list = function(req, res){
    taches.find({}).populate('taches','personnes').exec(function (err, tacheEffectuer) {
        console.log(tacheEffectuer);
        if (err){
            console.log("error");
        }else {
            res.render("../views/index", {data: tacheEffectuer})
        }
    })
};

// ajout des tache à effectuer
tachesAEffectuerController.add = function(req, res){
    var tache_a_effectuer = new taches(req.body);
    tache_a_effectuer.save(function (err) {
        if(err){
            console.log("error");
        }else {
            res.redirect("/");
        }
    })
};





module.exports = tachesAEffectuerController;