//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/robo3TwikiDB", {useNewUrlParser:true});
const articleSchema = {
title : String ,
content : String
};

const Article = mongoose.model("Article" , articleSchema);

// create get route to fetch articles
// EARLIER GET/POST WAS DONE USING <form> TAG IN HTML... NOW WE ARE USING VIA API'S
app.get("/articles" , function(req,res){
// here we will query our db & find all the docs inside article collection
Article.find(function(err, foundArticles){
if(!err){
res.send(foundArticles);
}
else{
  res.send(err);
}

});

});
// now in case of post route... we have to post data without building frontend
// purely on basis of api
// to use express to post request....
app.post("/articles" , function(req, res){
// if <form> then we may tap into individual pieces of data aka 'name'
console.log( );
console.log();

const newArticle = new Article({
title : req.body.title,
content : req.body.content

});

newArticle.save()


// this must save it in db by robo3T

});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
