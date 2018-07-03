var express = require('express');
var router = express.Router();

var effectuer = require("../controllers/effectuerController");


router.get('/', effectuer.list);

//cree une tache à effectuer
router.post("/creer", effectuer.add);

router.get("/delete/:id", effectuer.del);

//editer une tâche à effectuer
router.get("/edit/:id", effectuer.edit);

// //sauvegarder une personne
router.post("/save", effectuer.save);

router.get('/tache', effectuer.taches);

module.exports = router;