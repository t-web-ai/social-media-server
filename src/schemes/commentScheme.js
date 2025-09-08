import Joi from "joi";
export const commentScheme = Joi.object({
  comment: Joi.string().required().max(250).trim(),
});
