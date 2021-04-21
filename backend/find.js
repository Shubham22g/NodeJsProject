var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Dummy");
  dbo.collection("customers").findOne({name:"Mandeep kumar"}, function(err, result) {
    if (err) throw err;
    console.log(result.name, result);
    db.close();
  });
});