var mongoose = require('mongoose');
// Schema de données de la collection personnes
var personnesSchema = new mongoose.Schema({
    nom : String,
    prenom : String,
    mobile : String,
    status: Boolean,
});

module.exports = mongoose.model("personnes", personnesSchema);