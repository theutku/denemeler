import * as mongoose from 'mongoose';
import db from './index';

export interface ILoginModel {
    username: string;
    password: string;
}

export interface ISignupModel extends ILoginModel {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
}

export interface IUserModel extends ISignupModel, mongoose.Document {
    meta: {
        created: Date,
        version: number
    };
}

export const UserSchema = new mongoose.Schema({
    meta: { created: { type: Object, required: true }, _v: { type: Number, required: false } },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true }
});

UserSchema.index({ 'email': 1 }, { unique: true });

//export let userModel: mongoose.Model<IUserModel>;

export let User = db.connection.model<IUserModel>('user', UserSchema);

// export default (conn: mongoose.Connection) => {
//     (userModel = conn.model<IUserModel>('user', UserSchema));
// };