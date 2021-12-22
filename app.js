const express = require("express");
const { MongoClient } = require("mongodb");

require("dotenv").config();
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
init();
const app = express();
const port = process.env.PORT || 3000;

async function init() {
  await client.connect();
}

app.get("/", async (req, res) => {
  try {
    const cursor = await client
      .db("prod")
      .collection("cards")
      .find({})
      .toArray();
    res.json(cursor);
  } catch {
    res.status(500).send("Error");
  }
});

app.get("/tag/:tag", async (req, res) => {
  try {
    const cursor = await client
      .db("prod")
      .collection("cards")
      .find({ tag: req.params.tag })
      .toArray();
    res.json(cursor);
  } catch {
    res.status(500).send("Error");
  }
});

app.get("/tags", async (req, res) => {
  try {
    const cursor = await client
      .db("prod")
      .collection("tags")
      .find({})
      .toArray();
    res.json(cursor);
  } catch {
    res.status(500).send("Error");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
