import { Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    phone?: string;
    address: Address[];
}

export interface Address {
state: string;
city: string;
street: string;
zip: string;
complement?: string;
}