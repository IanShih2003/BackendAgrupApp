const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");

const authCli = require("./routes/authCli");
const actividades = require('./routes/crearActividades')

app.use(bodyparser.json({ limit: "50mb" }));
app.use(bodyparser.urlencoded({ limit: "50mb", extended: true }));
require("dotenv/config");

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Conectado a db")
);

app.use(cors());
app.use(express.json());

app.use("/api/users", authCli);
app.use("/api/users", actividades)

app.listen(3000, function () {
  console.log("Listening port 3000");
});
