
const express = require("express");
const path = require("path");
const mustacheExpress = require("mustache-express");
const app = express();
const dataFile = require("./data.js")

app.engine("mustache", mustacheExpress());
app.set("views", "./views")
app.set("view engine", "mustache")

app.use(express.static(__dirname + '/public'));

app.get("/", function (req, res) {
		res.send(dataFile);
})

app.get("/users/", function (req, res) {
		res.render('directory',dataFile);
})

app.get("/users/:username", function (req, res) {

  let thisUser = dataFile.users.filter(function( obj ) {
    return obj.username == req.params.username;
  });

    res.render('user',thisUser[0])
})

app.listen(3000, function () {
	  console.log("Successfully started express application!");
})




// COPIED FROM CLINTON'S LECTURE
app.use('/static',express.static('static'));

app.use('/',function(req,res)){
	MongoClient
}
