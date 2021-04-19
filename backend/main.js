const { json } = require("body-parser");
const express = require("express");
const moviesData = require("./movies.json");
var fs = require("fs");
cors = require("cors");
const { join } = require("path");
const { RSA_NO_PADDING } = require("constants");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	res.send("Hello from vipin");
});

app.post("/login", (req, res) => {
	try{
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("Dummy");
		dbo.collection("customers").findOne({email:req.body.email}, function(err, result) {
		 if(result==null){
			res.status(401).send("Not found Account with this : "+req.body.email);
		 }
		 else{
			 if(result.password === req.body.password){
				res.status(200).send(result);
			 }else{
				res.status(401).send("Email & Password Not matched");
			 }			
		 }
		 db.close();
		});
	  });
	}catch (err) {
		console.log("eroertyui");
		res.status(401).send("Something went wrong");
	}
});

app.put("/update", (req, res) => { 
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("Dummy");
		var userData = req.body;
		dbo.collection("customers").updateOne({email:userData.email}, {$set:{"fullName":userData.fullName, "number":userData.number, "age":userData.age} }, function(err, result) { 
		  if (err) {
			res.status(400).send("Bad Request : You have error in data!");
		  }else{
			  res.status(200).send(req.body);
		  }
		  db.close();
		});
	  });	 
});

app.post("/register", (req, res) => { 
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("Dummy");
		dbo.collection("customers").insertOne(req.body, function(err, result) { 
		  if (err) {
			res.status(400).send("Bad Request : You have error in data!");
		  }else{
			  res.status(200).send(req.body);
		  }
		  db.close();
		});
	  });	 
});
// app.post("/register", (req, res) => {
// 	try {
// 		if (req.body) {

// 		}
// 	} catch (err) {
// 		res.status(401).send("Something went wrong");
// 	}
// });

// fs.readFile("./userData.json", function readFileCallback(err, data) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		obj = JSON.parse(data); //now it an object
// 		obj.data.push({ id: 2, square: 3 }); //add some data
// 		let json = JSON.stringify(obj); //convert it back to json
// 		// fs.writeFile("myjsonfile.json", json, "utf8", () => console.log("hello"));
// 	}
// });

// var data = {};
// data.table = [];

// var obj = {
// 	id: 2,
// 	name: "vipinshrma",
// };
// data.table.push(obj);

// fs.writeFile("./userData.json", JSON.stringify(data), function (err) {
// 	if (err) throw err;
// 	console.log("complete");
// });

let PORT = "5000";

app.listen(PORT, () => {
	console.log("Server running on port" + PORT);
});
