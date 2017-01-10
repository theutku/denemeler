import * as mongoose from 'mongoose';
import * as UserModel from '../db/usermodel';
import config from '../config';

class CrudRoutes {
    createUser(doc: UserModel.ISignupModel) {
        var newUser: UserModel.IUserModel
        newUser.meta = newUser.meta || {
            created: new Date(),
            version: config.version
        }

        return newUser.save().then((user) => { return user }).catch((err) => { return err });
    }

    deleteAccount(doc: UserModel.ILoginModel) {

    }
}

export default new CrudRoutes();