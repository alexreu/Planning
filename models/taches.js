var mongoose = require ('mongoose');


// Schema de données de la collection tâches
var tachesSchema = new mongoose.Schema({
    nom: String,
    commentaire: String,
});

module.exports = mongoose.model("Tache", tachesSchema);