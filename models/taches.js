//quelles technos? pourquoi? 
//module mongoose de Node JS qui permet de créer un schéma de données 
//évite de le créer manuellement via des lignes de commande 

var mongoose = require ('mongoose');

// Schema de données de la collection tâches
var tachesSchema = new mongoose.Schema({
    nom: String,
    commentaire: String,
    affecte: {type: Boolean, default: false},
});

// module qui permet d'exporter le modèle du schéma de données de la collection tâches 
module.exports = mongoose.model("taches", tachesSchema);