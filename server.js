const express = require ('express');
const app = express();
const port = 3012;
const crud = require ('./crud.js');
const bodyParser = require('body-parser');
app.set('view engine', 'ejs');
app.use(express.static('public'));

//route vers l'index
app.get('/', function (req, res) {
    crud.bddListe(function(data){
        res.render('index', {
            data: data
        });
    })
});

//route pour ajouter une personne
app.post('/add_person', function (req, res) {
    var name = req.body.name;
    var firstname = req.body.firstname;
    crud.bddAdd(name, firstname, function (status) {
        res.send(status);
    })
});

//route pour ajouter une tâche
app.post('/add_ task', function (req, res) {
    var task = req.body.task;
    crud.bddAdd(task, function (status) {
        res.send(status);
    })
});



app.listen(port, function () {
    console.log("Server ON / Port: " + port);
});