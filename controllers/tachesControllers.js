//export du module
var mongoose = require('mongoose');
var taches = require('../models/taches');

/*controller pour les taches */
var tachesController = {};

tachesController.list = function(req,res){
    taches.find({}).exec(function (err, taches) {
        if (err){
            console.log('Error : ', err);
        }else{
            res.render("../views/planning/taches", {taches:taches} );
        }
    });
};


//redirection à la page de creation de taches
tachesController.creer = function(req, res){
    res.render("../views/planning/addTache");
};


//enregistrement des taches 
tachesController.save = function(req, res){
    var tache = new taches(req.body);

    tache.save(function(err){
        if(err){
            console.log(err);
            res.render("../views/planning/addTache");
        } else{
            console.log("creation legume OK");
            res.redirect("/tache");
        } 
    });
};





module.exports = tachesController;