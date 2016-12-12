import * as mongoose from 'mongoose';
import * as mongodb from 'mongodb';
import config from '../config';

export class DBManager {
    connection: mongoose.Connection;


    connect() {
        return new Promise((resolve, reject) => {
            var connString = 'mongodb://' + config.dbaddress + ':' + config.dbport + '/' + config.dbname;

            this.connection = mongoose.createConnection(connString);
            this.connection.on('connected', () => {
                resolve();
            });

            this.connection.on('error', (err) => {
                console.log(err);
                reject(err);
            });
        });
    }
}

export default new DBManager();