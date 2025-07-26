const Joi = require("joi");

const createUserSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(7).max(15).required(),
  role: Joi.string().valid("user", "admin").optional(),
  password: Joi.string().min(6).required(),
});

const updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(50),
  email: Joi.string().email(),
  phone: Joi.string().min(7).max(15),
  role: Joi.string().valid("user", "admin"),
  password: Joi.string().min(6),
}).min(1);

module.exports = { createUserSchema, updateUserSchema };
