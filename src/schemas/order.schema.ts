import joi from "joi";
import { addressSchema } from "./address.schema.js";

const productsSchema = {
  product_id: joi.string().required(),
  amount: joi.number().required(),
};

const createOrderSchema = joi.object({
  products: joi.array().items(productsSchema).required(),
  payment_method: joi
    .string()
    .valid("credit", "debit", "vale-refeicao", "pix")
    .required(),
  delivery_address: addressSchema,
});

export { createOrderSchema };
