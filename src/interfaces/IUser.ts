import { Document } from "mongoose";
import { Address } from "./IAddress";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    phone?: string;
    address: Address[];
}
