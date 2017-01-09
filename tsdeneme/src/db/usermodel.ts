import * as mongoose from 'mongoose';
import { IUserModel } from '../models/user';

class DBSchema extends mongoose.Schema {

    presave(doc: IUserModel, next: Function) {
        try {
            if (doc.isNew) {
                let id = mongoose.Types.ObjectId;
                let date = new Date();
                doc._id = id;
                doc.meta.created = date;
            }
            next();
        } catch (err) {
            next(err);
        }
    }
}

export const UserSchema = new DBSchema({
    meta: { created: { type: Object, required: true }, _v: { type: Number, required: false } },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true }
});

UserSchema.index({ 'email': 1 }, { unique: true });

export let UserModel: IUserModel;

export default (conn: mongoose.Connection) => {

    (UserModel = conn.model('user', UserSchema))
};