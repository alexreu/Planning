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
tachesController.edit = function(req, res) {
    console.log(req.body.task_id);
    taches.findOneAndUpdate(req.body.task_id, {
        $set: {
            nom: req.body.update_task,
            commentaire: req.body.update_com
        }
    }, function (err, taches) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/tache");
        }
    });
};

//fonction supprimer
tachesController.delete = function(req, res){
    var id= req.params.id;
    taches.findOneAndDelete(id, function (err) {
        if(err){
            console.log("error de suppression")
        }else {
            res.redirect("/taches");
        }
    })
}


module.exports = tachesController;
