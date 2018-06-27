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

/*
function dbbListe(){

}

exports.bddListe()*/
