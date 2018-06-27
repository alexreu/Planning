const express = require ('express');
const app = express();
const port = 3012;
const crud = require ('./crud.js');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

//route vers l'index
app.get('/', function (req, res) {
    let liste_personnes;
    // utilisation de plusieurs fonction dans la même route
    // on stock le resulat dans une nouvelle variable
    // puis on l'a passe à la vue dans le res.render
    crud.bddListe_P(function (data) {
        liste_personnes = data;
    });
    crud.bddListe_T(function(data){
        res.render('index', {
            Liste_taches: data,
            liste_personnes: liste_personnes
        });
    })
});

//route pour ajouter une personne
app.post('/add_person', function (req, res) {
    var nom = req.body.nom;
    console.log(nom);
    var prenom = req.body.prenom;
    console.log(prenom);
    crud.bddAdd_P(nom, prenom, function (status) {
        res.send(status);
    })
});

//route pour ajouter une tâche
app.post('/add_task', function (req, res) {
    var task = req.body.task;
    crud.bddAdd_T(task, function (status) {
        res.send(status);
    })
});

//route pour éditer une tâche
app.post('/update_task', function (req, res) {
    var task = req.body.task;
    var task_id = req.body.task_id;
    crud.bddEdit_T(task, task_id, function (status) {
        res.send(status);
    })
});



app.listen(port, function () {
    console.log("Server ON / Port: " + port);
});