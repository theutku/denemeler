import * as mongoose from 'mongoose';
import DBManager from '../index';

export default class DBModelLoader {
    static use(db: DBManager) {
        return [
            require('./usermodel')
        ]
    }
}

