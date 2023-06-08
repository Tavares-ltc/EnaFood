import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/IUser";


const UserSchema: Schema = new Schema({
    name: {type: String, required: true},
    email: {type: String, reqired: true, unique: true, index: true },
    password: {type: String, required: true},
    address: {type: Array, required: true}
})

const User = mongoose.model<IUser>('User', UserSchema)

export default User;