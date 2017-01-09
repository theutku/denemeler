import * as mongoose from 'mongoose';
import config from '../config';


export interface IContact {
    name: string;
    surname: string;
    email: string;
    phone: string;
}

export interface IContactModel extends IContact {
    created: Date;
    updated?: Boolean;
    version: number;
}

export class UserCrud {

    createContact(userDocument: IContact) {

    }
}
