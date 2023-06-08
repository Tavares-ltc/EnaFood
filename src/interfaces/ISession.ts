import { Document } from "mongoose";

export interface ISession extends Document {
    name: string;
    user_id: string;
    token: string;
    date: Date;
}
