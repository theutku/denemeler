import * as mongoose from 'mongoose';
import * as UserModel from '../db/models/usermodel';

export default class CrudRoutes<T extends UserModel.IUserModel> {

    createUser(doc: UserModel.IUserModel) {
        return this.model.create([doc]).then((user) => { return user }).catch((err) => { return err });
    }

    deleteAccount(doc: UserModel.ILoginModel) {

    }

    constructor(public model: mongoose.Model<T>) {

    }
}

