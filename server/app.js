const express = require("express");
//require("dotenv").config();
const app = express();
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
app.use(express.json());

app.use("/dist", express.static(path.join(__dirname, "../dist")));
app.use("/static", express.static(path.join(__dirname, "../static")));
app.use(cors());
app.use(morgan('dev'));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../static/index.html"))
);

app.use("/api/auth", require("./api/auth"));

app.use("/api",require('./api'));

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send({ error: err.message });
});

module.exports = app;
