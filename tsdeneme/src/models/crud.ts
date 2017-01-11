import * as mongoose from 'mongoose';
import * as UserModel from '../db/models/usermodel';

class CrudRoutes {
    createUser(doc: UserModel.IUserModel) {
        return doc.save().then((user) => { return user }).catch((err) => { return err });
    }

    deleteAccount(doc: UserModel.ILoginModel) {

    }
}

export default new CrudRoutes();