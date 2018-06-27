var express = require('express');
const bdd = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');
const url = "mongodb://localhost:27017/planning";

//fonction qui permet d'afficher les données de la database
exports.bddListe = function(cb){
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

//fonction qui permet d'ajouter une personne dans la database
exports.bddAdd = function(name, firstname, cb){
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
}

//fonction qui permet d'ajouter une tâche dans la database
exports.bddAdd = function(task, cb){
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
}


/*
function dbbListe(){

}

exports.bddListe()*/
