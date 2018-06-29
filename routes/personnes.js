var express = require('express');
var router = express.Router();


var personne = require("../controllers/usersController");

/* GET home page. */
router.get('/', personne.list );

//cree une personne
router.get("/creer", personne.create);

//sauvegarder une personne
router.post("/save", personne.save);



module.exports = router;