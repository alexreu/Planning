/* Model de la bdd */

var mongoose = require ('mongoose');


// Schema de données de la collection tâches 
var tachesSchema = new mongoose.schema({
    nom: String,
    commentaire: String,
});

// Schema de données de la collection personnes 
var personnesSchema = new mongoose.schema({
    nom : String,
    prenom : String,
    mobile : String,
});

// Schema de données de la collection tâches à effectuer 
var effectuerSchema = new mongoose.schema({
    nom_tache: {type: Schema.Type.ObjectId, ref:'taches'},
    // commentaire_tache: {type: Schema.Type.ObjectId, ref: 'taches'},
    nom_personne: {type: Schema.Type.ObjectId, ref: 'personnes'},
    date_debut: String,
    date_fin : String,
    statut: Boolean,
});

module.exports = mongoose.model("taches", tachesSchema);

module.exports = mongoose.model("personnes", personnesSchema);

module.exports = mongoose.model("effectuer", effectuerSchema);