var mongoose = require ('mongoose');
var Schema = mongoose.Schema;
// Schema de données de la collection tâches
var tachesSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    nom: String,
    commentaire: String,
});

module.exports = mongoose.model("Tache", tachesSchema);