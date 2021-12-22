const express = require("express");
const { MongoClient } = require("mongodb");
var cors = require("cors");

require("dotenv").config();
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
init();
const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

async function init() {
  await client.connect();
}

app.get("/aslapi", async (req, res) => {
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

app.get("/aslapi/tag/:tag", async (req, res) => {
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

app.get("/aslapi/tags", async (req, res) => {
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
