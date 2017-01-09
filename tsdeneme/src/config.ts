import * as nconf from 'nconf';

class Config {

    public static PORT = 'PORT';
    public static DBADRESS = 'DBADRESS';
    public static DBNAME = 'DBNAME';
    public static DBPORT = 'DBPORT';
    public static VERSION = 'VERSION'

    port: number;
    dbaddress: string;
    dbname: string;
    dbport: number;
    version: number;

    get(key?: string, cb?: nconf.ICallbackFunction) {
        return nconf.get(key, cb);
    }

    constructor() {
        nconf.argv().env();

        this.port = this.get(Config.PORT) || 3000;
        this.dbaddress = this.get(Config.DBADRESS) || '127.0.0.1';
        this.dbname = this.get(Config.DBNAME) || 'angupgrade';
        this.dbport = this.get(Config.DBPORT) || 27017;
        this.version = this.get(Config.VERSION) || 1.0;
    }
}

export default new Config();