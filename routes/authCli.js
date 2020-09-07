const express = require("express");
const router = express.Router();
const Client = require("../models/Client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  // const validation = registerSchemaCli.validate(req.body);
  // if (validation.error)
  //   return res.status(400).send(validation.error.details[0].message);

  const emailCheck = await Client.findOne({ mail: req.body.mail });
  if (emailCheck) return res.status(400).send("Email already exists");

  const saltRounds = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(req.body.contrasenia, saltRounds);

  const newUser = new Client({
    nombre: req.body.nombre,
    mail: req.body.mail,
    usuario: req.body.usuario,
    contrasenia: hashPass,
    zona: "Nuñez",
    estudios: "ciencias",
    intereses: "jueguitos",
    anio: "2003-06-30"
  });

  try {
    const saved = await newUser.save();
    res.json({
      succes: 1
    })
  } catch (err) {
    console.log(err)
    res.status(400).send("New Client couldn't be saved");
  }
});

router.post("/login", async (req, res) => {
  // const validation = loginSchemaCli.validate(req.body);
  // if (validation.error)
  //   return res.status(400).send(validation.error.details[0].message);

  const emailCheck = await Client.findOne({ mail: req.body.mail });
  if (!emailCheck)
    return res.status(400).send("No Client with email requested");

  const hash = emailCheck.contrasenia;
  const myPass = req.body.contrasenia;
  const id = emailCheck._id;

  const success = await bcrypt.compare(myPass, hash);
  if (!success) return res.status(400).send("Invalid Password");

  const token = await jwt.sign(id.toJSON(), process.env.JWT_KEY);
  res.header("token", token).json({
    succes: 1,
    token: token
  })
})

router.get("/conseguirporid", async(req, res) => {
  console.log(req.headers.token)
  const token = req.headers.token;
  const decoded = jwt.decode(token)
  const cliCheck = await Client.findOne({_id: decoded})
  if(!cliCheck) return res.send("No client")
  res.json({
    succes : 1,
    user: cliCheck
  })
})

module.exports = router;
