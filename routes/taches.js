var express = require ('express');
var router = express.Router();


// appel tachesController
var taches = require("../controllers/tachesControllers");


// route pour lister les taches
router.get('/', taches.list);

// route pour créer une tache
router.get ('/creer', taches.creer)

//sauvegarder un legume. /!\ cest un POST
router.post("/save", taches.save);



//editer une tâche
router.get("/edit/:id", taches.edit);


//export du module router
module.exports = router;