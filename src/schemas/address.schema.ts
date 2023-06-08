import joi from "joi";

const addressSchema = joi.object({
  state: joi.string().required(),
  city: joi.string().required(),
  street: joi.string().required(),
  zip: joi.string().required(),
  complement: joi.string().optional(),
});

export { addressSchema };
