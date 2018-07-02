var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Schema de données de la collection tâches à effectuer
var effectuerSchema = new mongoose.Schema({
    id_tache: {type: Schema.Types.ObjectId, ref:'taches'},
    id_personne: {type: Schema.Types.ObjectId, ref: 'personnes'},
    date_debut: String,
    date_fin : String,
    statut: Boolean,
});

module.exports = mongoose.model("effectuer", effectuerSchema);