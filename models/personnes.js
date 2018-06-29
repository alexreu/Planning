var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Schema de données de la collection personnes
var personnesSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    nom : String,
    prenom : String,
    mobile : String,
});

module.exports = mongoose.model("Personne", personnesSchema);