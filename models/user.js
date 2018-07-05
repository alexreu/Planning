//quelles technos? pourquoi? 
//module mongoose de Node JS qui permet de créer un schéma de données 
//évite de le créer manuellement via des lignes de commande 

var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    passwordConfirmation: {
        type: String,
        required: true,

    }
});

// var User = mongoose.model('User', UserSchema);
// module.exports = User;

// module qui permet d'exporter le modèle du schéma de données de la collection user 
module.exports = mongoose.model("User", UserSchema);    