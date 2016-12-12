import * as mongoose from 'mongoose';

export interface ILoginModel{
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

export interface IClientDocument {

}

export interface IUserDocument extends mongoose.Document, ISignupModel {
    _meta: {
        created: Date;
        updated?: Date;
    }

    toClient(): IClientDocument; 
}