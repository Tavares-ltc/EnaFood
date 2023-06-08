import joi from "joi";
import { addressSchema } from "./address.schema.js";



const signUpSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().max(50).required(),
    password: joi.string().max(50).required(),
    address: joi.array().items(addressSchema)
});

const signInSchema = joi.object({
    email: joi.string().max(50).required(),
    password: joi.string().max(50).required()
});

export {
    signUpSchema,
    signInSchema
};