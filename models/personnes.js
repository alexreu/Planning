//quelles technos? pourquoi? 
//module mongoose de Node JS qui permet de créer un schéma de données 
//évite de le créer manuellement via des lignes de commande 

var mongoose = require('mongoose');
// Schema de données de la collection personnes
var personnesSchema = new mongoose.Schema({
    nom : String,
    prenom : String,
    mobile : String,
    status: Boolean,
});

// module qui permet d'exporter le modèle du schéma de données de la collection personnes 
module.exports = mongoose.model("personnes", personnesSchema);