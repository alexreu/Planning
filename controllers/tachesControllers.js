/*controller pour les taches */

var mongoose = require('mongoose');

var taches = require("../models/taches");

var tachesControllers = {};





//redirection à la page de creation de taches
tachesController.creer = function(req, res){
    res.render("../views/taches/creer");
};




//export du module
module.exports = tachesController;