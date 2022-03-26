var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var menRouter = require("./routes/men");
var womenRouter = require("./routes/women");
var sportsRouter = require("./routes/sports");

var app = express();
var mongoose = require("mongoose");
const { MongoServerClosedError } = require("mongodb");
var connexionStringLocal =
  "mongodb+srv://maxpochet:Max130501@les-copains.apj9k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
var mongodb = process.env.MONGO_URI || connexionStringLocal;
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use("/men", menRouter);
app.use("/women", womenRouter);
app.use("/sports", sportsRouter);


module.exports = app;
