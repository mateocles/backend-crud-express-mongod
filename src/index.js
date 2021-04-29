const express = require("express");
const path = require("path");
const morgan = require("morgan");
(bodyParser = require("body-parser")),
  (mongoose = require("mongoose")),
  ({ DB } = require("./config/DB")),
  cors = require('cors'),
  (pokemonRoutes = require("./routes/pokemon"));

mongoose.Promise = global.Promise;
mongoose
  .connect(DB, { useMongoClient: true })
  .then(() => console.log("Db is conencted"))
  .catch((err) => console.error(err));

const app = express();
var port = process.env.PORT || 4000;

// middlewares
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

// routes
app.use("/pokemon", pokemonRoutes);

// start the server
var server = app.listen(port, function () {
  console.log("Listening on port " + port);
});
