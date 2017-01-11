import * as mongoose from 'mongoose';
import config from '../config';

class DBManager {
    connection: mongoose.Connection;

    connect() {
        return new Promise((resolve, reject) => {
            var connString = 'mongodb://' + config.dbAddress + ':' + config.dbPort + '/' + config.dbName;

            this.connection = mongoose.createConnection(connString);
            this.connection.on('connected', () => {
                resolve();
            });
            this.connection.on('error', (err: Error) => {
                console.log(err);
                reject(err);
            });
        });
    }
}

export default new DBManager();