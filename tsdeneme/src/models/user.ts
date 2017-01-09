import * as mongoose from 'mongoose';
import config from '../config';

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

class UserCrudRoutes {

    create(newUser: ISignupModel) {

    }
}

