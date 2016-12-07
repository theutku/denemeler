class Config {
    
    public port: number;
    public dbaddress: string;
    public dbport: number;
    public dbname: string;
    public dbpwd: string;

    constructor() {
        this.port = 3000;
        this.dbaddress = '127.0.0.1';
        this.dbport = 27017;
        this.dbname = 'angupgrade';
    }


}

export default new Config();