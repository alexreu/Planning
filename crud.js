var express = require('express');
const bdd = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');
const url = "mongodb://localhost:27017/planning";

//fonction qui permet d'afficher les données de la database
exports.bddListe_T = function(cb){
    bdd.connect(url, function (err, database) {
        assert.equal(null, err);
        console.log("connexion BDD Ok");
        let dbo = database.db("planning");
        dbo.collection("taches").find({}).toArray(function (err, data) {
            cb(data);
        });
        database.close();
    });
};

// fonction qui permet d'afficher la liste des personnes existantes en base
exports.bddListe_P = function(cb){
    bdd.connect(url, function (err, database) {
        assert.equal(null, err);
        let dbo = database.db("planning");
        dbo.collection("personnes").find({}).toArray(function (err, data) {
            cb(data)
        });
        database.close();
    })
}

//fonction qui permet d'ajouter une personne dans la database
exports.bddAdd_P = function(name, firstname, cb){
    bdd.connect(url, function (err, database) {
        assert.equal(null, err);
        console.log("connexion BDD Ok");
        let dbo = database.db("planning");
        dbo.collection("personnes").insertOne({nom: name, prenom: firstname}, function (err, status) {
            if (!err) {
                status = "success";
                cb(status)
            } else {
                status = "error";
                cb(status)
            }
        });
        database.close()
    })
};

//fonction qui permet d'ajouter une tâche dans la database
exports.bddAdd_T = function(task, cb){
    bdd.connect(url, function (err, database) {
        assert.equal(null, err);
        console.log("connexion BDD Ok");
        let dbo = database.db("planning");
        dbo.collection("taches").insertOne({nom_taches: task }, function (err, status) {
            if (!err) {
                status = "success";
                cb(status)
            } else {
                status = "error";
                cb(status)
            }
        });
        database.close()
    })
};

// fonction permettant d'éditer une taches en bdd
exports.bddEdit_T = function (task_name, task_id) {
    bdd.connect(url, function (err, database) {
        assert.equal(null, err);
        let dbo = database.db("planning");
        dbo.collection("taches").findOneAndUpdate({_id: ObjectID(task_id)}, {
            $set:{
                nom_taches: task_name
            }
        }), function (err) {
                if (err){
                    console.log("erreur de MAJ");
                }
        };
        database.close();
    })
};
// fonction permettant de supprimer une tache
exports.bddDelete_T = function (task_id) {
    bdd.connect(url, function (err, database) {
        assert.equal(null, err);
        let dbo = database.db("planning");
        dbo.collection("taches").findOneAndDelete({_id: ObjectID(task_id)})
        database.close();
    })
};