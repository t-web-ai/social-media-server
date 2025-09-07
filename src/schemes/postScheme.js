import Joi from "joi";

export const postScheme = Joi.object({
  content: Joi.string().required().max(500).trim(),
});
