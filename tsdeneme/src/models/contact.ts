import * as mongoose from 'mongoose';

export interface IContactModel {
    owner: string | mongoose.Types.ObjectId;
    created: Date;
    updated?: Date;
    name: string;
    surname: string;
    email: string;
    phone: string; 
}

export interface IDBContactModel extends IContactModel, mongoose.Document{

}

