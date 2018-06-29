var express = require ('express');
var router = express.Router();


// appel tachesController
var taches = require("../controllers/tachesControllers")


// route pour créer une tache 
router.get ('/create', tache)



//export du module router
module.exports = router;