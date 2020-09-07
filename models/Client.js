const mongoose = require("mongoose");
const ClientSchema = mongoose.Schema({
  usuario: {
    type: String,
  },
  nombre: {
    type: String,
  },
  anio: {
    type: Date,
  },
  zona: {
    type: String,
  },
  estudios: {
    type: String,
  },
  intereses: {
    type: String,
  },
  mail: {
    type: String,
    required: true,
  },
  contrasenia: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Client", ClientSchema);
