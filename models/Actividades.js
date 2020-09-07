const mongoose = require("mongoose");
const ActivSchema = mongoose.Schema({
  numero_de_creacion:{
    type: String,
  },
  nombre_proyecto:{
    type: String,
  },
  descripcion_proyecto:{
    type: String,
  },
  trabajo:{
    type: String,
  },
  zona:{
    type: String,
  },
  cant_trabajadores:{
    type: Number,
  },
  estado_proyecto:{
    type: String,
  },
  usuario_id_usuario:{
    type: String,
  },
  Id_unidos:{
    type: [String],
  },
});

module.exports = mongoose.model("Actividades", ActivSchema);
