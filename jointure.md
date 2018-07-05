// fonction permettant de lister toutes les taches avec le nom des personnes qui l'effectuent (populate permet de faire la jointure)

Dans la collection où l'on veut faire la jointure, on va rajouter l'ID des documents des collections que l'on veut appeler.
Dans la fonction qui permet de faire la jointure, on utilise populate('référence à la collection que l'on veut appeler').

effectuerController.list = function(req, res){
    effectuer.find({}).
    populate('id_tache').
    populate('id_personne').
    exec(function (err, result) {
        if (!err) {
            res.render("../views/effectuer/effectuer", {
                data: result, // result correspond à ce que l'on voit en card sur la page d'accueil
                personnes: personnesList,
            });
        } else {
            console.log("error");
        }
    })
};