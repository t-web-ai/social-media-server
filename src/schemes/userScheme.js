import Joi from "joi";

export const registerScheme = Joi.object({
  email: Joi.string().required().email().trim(),
  username: Joi.string().required().trim(),
  password: Joi.string().required().min(8).trim(),
});

export const loginScheme = Joi.object({
  email: Joi.string().required().email().trim(),
  password: Joi.string().required().min(8).trim(),
});
