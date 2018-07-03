var express = require('express');
var router = express.Router();

var effectuer = require("../controllers/effectuerController");


router.get('/', effectuer.list);

//cree une tache à effectuer
router.post("/creer", effectuer.add);
//
// //sauvegarder une personne
// router.post("/save", personne.save);
// //
// // //sauvegarder un legume. /!\ cest un POST
// // router.post("/save", personne.save);
//
router.get("/delete/:id", effectuer.del);
//
//
// //editer une personne
// router.post("/edit", personne.edit);

router.get('/taches', effectuer.taches);

module.exports = router;