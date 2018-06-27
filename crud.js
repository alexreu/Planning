var express = require('express');
const bdd = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');
const url = "mongodb://localhost:27017/planning";

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

/*
function dbbListe(){

}

exports.bddListe()*/
