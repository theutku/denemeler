import config from '../config';
import * as mongoose from 'mongoose';
import * as mongodb from 'mongodb';

export class DBManager {
    
    public connection: mongoose.Connection;

    connect() {
        
        var connString = 'mongodb://' + config.dbaddress + ':' + config.dbport + '/' + config.dbname;

        this.connection = mongoose.createConnection(connString);

    }
}

export default new DBManager();