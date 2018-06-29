/*controller pour les taches */
var mongoose = require('mongoose');
var taches = require('../models/models');

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


module.exports = tachesController;