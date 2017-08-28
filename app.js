
const express = require("express");
const path = require("path");
const mustacheExpress = require("mustache-express");
const mongodb = require('mongodb');
const app = express();
const dataFile = require("./data.json")
const MongoClient = mongodb.MongoClient;
const mongoURL = 'mongodb://localhost:27017/newdb';

app.engine("mustache", mustacheExpress());
app.set("views", "./views")
app.set("view engine", "mustache")

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  MongoClient.connect(mongoURL, function (err, db) {
    const robots = db.collection('robots');
    robots.find({}).toArray(function (err, docs) {
      res.render("directory", {robots: docs});
    })
  })
})

app.get('/users/:username', function (req, res) {
  MongoClient.connect(mongoURL, function (err, db) {
    const robots = db.collection('robots');
    robots.find({username:req.params.username}).toArray(function (err, docs) {
      res.render("user", {robots: docs});
			console.log();
    })
  })
})

app.get('/employed', function (req, res) {
  MongoClient.connect(mongoURL, function (err, db) {
    const robots = db.collection('robots');
    robots.find({job:{$nin: [null]}}).toArray(function (err, docs) {
      res.render("directory", {robots: docs});
    })
  })
})

app.get('/forhire', function (req, res) {
  MongoClient.connect(mongoURL, function (err, db) {
    const robots = db.collection('robots');
    robots.find({job:null}).toArray(function (err, docs) {
      res.render("directory", {robots: docs});
    })
  })
})


app.listen(3000, function () {
	  console.log("Successfully started express application!");
})


// COPIED FROM CLINTON'S LECTURE
// app.use('/static',express.static('static'));
