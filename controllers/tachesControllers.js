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
            console.log("creation tache OK");
            res.redirect("/tache");
        } 
    });
};

//edition une tâche  par son id
tachesController.edit = function(req, res){
    var tache = new taches(req.body);

    Legume.findOne({_id:req.params.id}).exec(function(err, tache){
        if(err){
            console.log("Error ", err);
        } else{
            res.render("../views/tache/edit",{tache: tache} );
        } 
    });
};



module.exports = tachesController;