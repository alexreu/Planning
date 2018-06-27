const express = require ('express');
const app = express();
const port = 3012;
const crud = require ('./crud.js');
app.set('view engine', 'ejs');
app.use(express.static('public'));


app.get('/', function (req, res) {
    crud.bddListe(function(data){
        res.render('index', {
            data: data
        });
    })
});

app.listen(port, function () {
    console.log("Server ON / Port: " + port);
});