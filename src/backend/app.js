const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const bodyParser = require("body-parser");
const express = require("express");

// Connection URL
console.log(process.env.PASSWD);
const url =
  "mongodb://admin:" +
  process.env.PASSWD +
  "@roguelike-shard-00-00-ddtmn.mongodb.net:27017,roguelike-shard-00-01-ddtmn.mongodb.net:27017,roguelike-shard-00-02-ddtmn.mongodb.net:27017/test?ssl=true&replicaSet=roguelike-shard-0&authSource=admin";

// Database Name
const dbName = "roguelike";

// Use connect method to connect to the server
const accessDB = callback =>
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    const collection = db.collection("games");
    const result = callback(collection);

    client.close();
  });

const app = express();
app.use(bodyParser.json());
app.listen(3000, () => console.log("Example app listening on port 3000!"));

app.post("/games", function(req, res) {
  accessDB(collection => {
    const input = req.body;
    const startTime = new Date().getTime();
    const doc = Object.assign({}, input, { startTime });
    const output = Object.assign({}, doc);
    collection.insert(doc, (err, docs) => {
      const id = docs.insertedIds[0];
      output.id = id;
      res.send(output);
    });
  });
});

app.get("/games", function(req, res) {
  console.log("games");
  accessDB(collection => {
    collection.find().toArray((err, result) => {
      if (err) console.log(err);
      res.send(result);
    });
  });
});
