//quelles technos? pourquoi? 
//module mongoose de Node JS qui permet de créer un schéma de données 
//évite de le créer manuellement via des lignes de commande 

var mongoose = require('mongoose');

// Schema de données de la collection tâches à effectuer
var effectuerSchema = new mongoose.Schema({
    id_tache: [{type: mongoose.Schema.ObjectId, ref:'taches'}], // clé permettant de créer une jointure avec une autre collection 
    id_personne: [{type: mongoose.Schema.ObjectId, ref: 'personnes'}],// clé permettant de créer une jointure avec une autre collection 
    date_debut: String,
    date_fin : String,
    hour: String,
});

// module qui permet d'exporter le modèle du schéma de données de la collection effectuer 
module.exports = mongoose.model("effectuer", effectuerSchema);