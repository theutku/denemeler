import * as nconf from 'nconf';

class Config {
    public static PORT = 'PORT'
    public static DBADDRESS = 'DBADDRESS'
    public static DBNAME = 'DBNAME'
    public static DBPORT = 'DBPORT'

    port: number;
    dbAddress: string;
    dbName: string;
    dbPort: number;

    get(key?: string, cb?: nconf.ICallbackFunction) {
        return nconf.get(key, cb);
    }

    constructor() {
        nconf.argv().env();

        this.port = this.get(Config.PORT) || 3000;
        this.dbAddress = this.get(Config.DBADDRESS) || '127.0.0.1';
        this.dbName = this.get(Config.DBNAME) || 'tsRest';
        this.dbPort = this.get(Config.DBPORT) || 27017;
    }

}

export default new Config();