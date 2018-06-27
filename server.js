const express = require ('express');
const app = express();
const port = 3012;
const crud = require ('./crud.js');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function (req, res) {
    crud.bddListe(function(data){
        res.render('index', {
            data: data
        });
    })
});

app.post('/add_person', function (req, res) {
    var nom = req.body.nom;
    console.log(nom);
    var prenom = req.body.prenom;
    console.log(prenom);
    crud.bddAdd(nom, prenom, function (status) {
        res.send(status);
    })
});

app.listen(port, function () {
    console.log("Server ON / Port: " + port);
});