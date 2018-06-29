var express = require('express');
var router = express.Router();


var personne = require("../controllers/usersController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

//cree une personne
router.get("/creer", personne.create);

//sauvegarder une personne
router.post("/save", personne.save);



module.exports = router;
