//export du module
var mongoose = require('mongoose');
var taches = require('../models/taches');

/*controller pour les taches */
var tachesController = {};

//fonction qui permet d'afficher la liste des tâches
tachesController.list = function(req,res){
    taches.find({}).exec(function (err, taches) {
        if (err){
            console.log('Error : ', err);
        }else{
            res.render("../views/taches/taches", {taches:taches, success:req.session.success} );
        }
    });
};

//fonction qui permet de gérer le statut d'affectation de la tâche (booléen)
tachesController.affecter = function(id){
    console.log(id);
    var myId = mongoose.Types.ObjectId(id);
    taches.findByIdAndUpdate(myId, {
        $set: {
            affecte: true,
        }
    }, {new: true}, function (err) {
            if (err){
                console.log("error");
            }
        }
    )
};

//redirection à la page de creation de taches 
tachesController.creer = function(req, res){     
    res.render("../views/taches/addTache",{ error: req.session.error}); 
};

//fonction qui enregistre une tache
tachesController.save = function(req, res){
    var tache = new taches(req.body);

    tache.save(function(err){
        if(err){
            req.session.error = 'Echec de la création de la tâche';
            console.log(err);
            res.redirect("/taches/creer");
        } else{
            console.log("creation tache OK");
            req.session.success = 'Tâche créée';
            res.redirect("/taches");
        } 
    });
};

//edition d'une tâche  par son id
tachesController.edit = function(req, res) {
    console.log(req.body.task_id);
    taches.findByIdAndUpdate(req.body.task_id, {
        $set: {
            nom: req.body.update_task,
            commentaire: req.body.update_com
        }
    }, function (err, taches) {
        if (err) {
            req.session.error = "Echec de la mise à jour";
            console.log(err);
        } else {
            req.session.success = "Tâche mise à jour";
            res.redirect("/taches");
        }
    });
};

//fonction supprimer
tachesController.delete = function(req, res){
    var id= req.params.id;
    taches.findByIdAndDelete(id, function (err) {
        if(err){
            console.log("error de suppression")
        }else {
            req.session.success = "Tâche supprimée";
            res.redirect("/taches");
        }
    })
};

module.exports = tachesController;
