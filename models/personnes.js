// Schema de données de la collection personnes
var personnesSchema = new mongoose.Schema({
    nom : String,
    prenom : String,
    mobile : String,
});

module.exports = mongoose.model("Personne", personnesSchema);