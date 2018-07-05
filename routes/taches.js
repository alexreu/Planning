var express = require ('express');
var router = express.Router();


// appel tachesController
var taches = require("../controllers/tachesControllers");

function requireLogin (req, res, next) {
    if (req.session && req.session.userId) {
        next();
    }else {
        var err = new Error('error 404');
        err.status = 401;
        res.redirect('/admin');
    }
};

// route pour lister les taches
router.get('/', taches.list);

// route pour créer une tache
router.get ('/creer', taches.creer);

//sauvegarder un legume. /!\ c'est un POST
router.post("/save", taches.save);

//desactiver un enregistrement 
router.get("/delete/:id", taches.delete);

//editer une tâche
router.post("/edit", taches.edit);


//export du module router
module.exports = router;