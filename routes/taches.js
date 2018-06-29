var express = require ('express');
var router = express.Router();


// appel tachesController
var taches = require("../controllers/tachesControllers");


// route pour créer une tache 
//router.get ('/create', tache);

// route pour lister les taches
router.get('/', taches.list);



//export du module router
module.exports = router;