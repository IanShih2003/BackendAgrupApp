const Joi = require("@hapi/joi");

const registerSchema = Joi.object({
  NombreLocal: Joi.string().min(1).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  mail: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  contrasenia: Joi.string().min(6).required(),
});

const registerSchemaCli = Joi.object({
  usuario: Joi.string().required(),
  nombre: Joi.string().required(),
  mail: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  contrasenia: Joi.string().min(6).required(),
});

const loginSchemaCli = Joi.object({
  mail: Joi.string()
  .required(),
  contrasenia: Joi.string().min(6).required(),
});

const productSchema = Joi.object({
  product: Joi.array().items({
    Nombre: Joi.string().min(1).required(),
    Precio: Joi.number().min(0).required(),
    Stock: Joi.array().items(
      Joi.object({
        talle: Joi.string().required(),
        cantidad: Joi.number().min(0).required(),
        id: Joi.number(),
      })
    ),
    Descuento: Joi.number(),
    Photo: Joi.string().min(0).allow(null),
  }),
});

const multiProductSchema = Joi.object({
  data: Joi.array().items({
    Nombre: Joi.string().min(1).required(),
    Precio: Joi.number().min(0).required(),
    Stock: Joi.array().items(
      Joi.object({
        talle: Joi.string().required(),
        cantidad: Joi.number().min(0).required(),
        id: Joi.number(),
      })
    ),
    Descuento: Joi.number(),
    Photo: Joi.string().min(0).allow(null),
  }),
});

const updProductSchema = Joi.object({
  id: Joi.string().min(0).required(),
  Nombre: Joi.string().min(0),
  Precio: Joi.number().min(0),
  Stock: Joi.array().items(
    Joi.object({
      talle: Joi.string(),
      cantidad: Joi.number().min(0),
      id: Joi.number(),
    })
  ),
  Descuento: Joi.number(),
  Photo: Joi.string().min(0).allow(null),
});

const reqProductSchema = Joi.object({
  ProductId: Joi.string().required(),
  talle: Joi.string().required(),
});

const wishlistSchema = Joi.object({
  ProductId: Joi.string().required(),
});

const multDeleteSchema = Joi.array().items(Joi.string().required);

module.exports = {
  registerSchema,
  loginSchema,
  productSchema,
  updProductSchema,
  registerSchemaCli,
  loginSchemaCli,
  reqProductSchema,
  multiProductSchema,
  wishlistSchema,
  multDeleteSchema,
};
