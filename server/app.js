const express = require("express");
const path = require("path");
const cors = require("cors");
const volleyball = require("volleyball");
const bodyParser = require("body-parser");
const app = express();

// static middleware
app.use(express.static(path.join(__dirname, "..", "public")));

//bodyParse middleware handles JSON data

app.use(cors());
app.use(volleyball);
app.use(bodyParser.json());

app.use("/api", require("./api/index"));

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = app;
