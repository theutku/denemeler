import config from '../config';
import * as mongoose from 'mongoose';
import * as mongodb from 'mongodb';

export class DBManager {

    private connection: mongoose.Connection;

    connect() {
        return new Promise((resolve, reject) => {

            var connString = 'mongodb://' + config.dbaddress + ':' + config.dbport + '/' + config.dbname;

            this.connection = mongoose.createConnection(connString, (err: Error) => {
                if(err) {
                    console.log(err);
                    reject(err);
                }
                resolve();
            });

        });
    }
}

export default new DBManager();