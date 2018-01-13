const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const url =
  "mongodb://admin:Roguelike2018!@roguelike-shard-00-00-ddtmn.mongodb.net:27017,roguelike-shard-00-01-ddtmn.mongodb.net:27017,roguelike-shard-00-02-ddtmn.mongodb.net:27017/test?ssl=true&replicaSet=roguelike-shard-0&authSource=admin";

// Database Name
const dbName = "roguelike";

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  client.close();
});

const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(3000, () => console.log("Example app listening on port 3000!"));

app.post("/games", function(req, res) {
  res.send("TOIMII!");
});

app.post("/games", function(req, res) {
  res.send("TOIMII!");
});
