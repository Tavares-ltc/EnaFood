import mongoose, { Schema } from "mongoose";
import { ISession } from "../interfaces/ISession";


const SessionSchema: Schema = new Schema({
    name: {type: String, required: true},
    user_id: {type: Schema.Types.ObjectId, reqired: true, index: true },
    token: {type: String, required: true},
    date: { type: Date, default: Date.now }
})

const Session = mongoose.model<ISession>('Session', SessionSchema)

export default Session;