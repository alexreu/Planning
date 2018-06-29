var mongoose = require('mongoose');
// Schema de données de la collection tâches à effectuer
var effectuerSchema = new mongoose.Schema({
    id_tache: {type: Schema.Type.ObjectId, ref:'Tache'},
    // commentaire_tache: {type: Schema.Type.ObjectId, ref: 'taches'},
    id_personne: {type: Schema.Type.ObjectId, ref: 'Personne'},
    date_debut: String,
    date_fin : String,
    statut: Boolean,
});

module.exports = mongoose.model("effectuer", effectuerSchema);