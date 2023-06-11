import { Document } from "mongoose";
import { IAddress } from "./IAddress";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address: IAddress[];
}

interface IUserData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address: IAddress[];
}

export { IUser, IUserData };
