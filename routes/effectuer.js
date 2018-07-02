var express = require('express');
var router = express.Router();


var effectuer = require("../controllers/effectuerController");

/* GET home page. */
router.get('/', effectuer.list);

//cree une tache à effectuer
router.post("/creer", effectuer.add);

router.get('/test', effectuer.listX);
//
// //sauvegarder une personne
// router.post("/save", personne.save);
// //
// // //sauvegarder un legume. /!\ cest un POST
// // router.post("/save", personne.save);
//
// router.get("/delete/:id", personne.delete);
//
//
// //editer une personne
// router.post("/edit", personne.edit);



module.exports = router;