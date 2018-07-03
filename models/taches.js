var mongoose = require ('mongoose');
// Schema de données de la collection tâches
var tachesSchema = new mongoose.Schema({
    nom: String,
    commentaire: String,
    affecte: {type: Boolean, default: false},
});

module.exports = mongoose.model("taches", tachesSchema);