
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

app.get('/user/:username', function (req, res) {
  MongoClient.connect(mongoURL, function (err, db) {
    const robots = db.collection('robots');
    robots.find({username:req.params.username}).toArray(function (err, docs) {
      res.render("directory", {robots: docs});
    })
  })
})

db.restaurants.find({name: "Wendy'S"})


// app.get("/users/:username", function (req, res) {
//
//
//
//   let thisUser = dataFile.users.filter(function( obj ) {
//     return obj.username == req.params.username;
//   });
//
//     res.render('user',thisUser[0])
// })

app.listen(3000, function () {
	  console.log("Successfully started express application!");
})


// COPIED FROM CLINTON'S LECTURE
// app.use('/static',express.static('static'));
