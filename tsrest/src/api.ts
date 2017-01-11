import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as http from 'http';
import * as path from 'path';

import db from './db/index';
import config from './config';

class ApiApp {

    public app: express.Application;
    public router: express.Router

    private middlewares(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(logger('dev'));

        this.app.set('view engine', 'ejs');
        this.app.set('views', path.join(__dirname, '../views'));

        this.app.use((req, res, next) => {
            res.status(404).send('404 Not Found');
        });
        this.app.use((req, res, next) => {
            res.status(500).send('500 Internal Server Error');
        });
    }

    private routes(): void {
        this.router = express.Router();
        this.app.use(this.router);
        this.router.get('/test', (req, res, next) => {
            res.send('App Successful!');
        });
    }

    private init() {
        const server = http.createServer(this.app);

        return db.connect().then(() => {
            console.log('Connected to database: ' + config.dbName);
            server.listen(config.port, (err: Error) => {
                if (err) {
                    console.log(err);
                    process.exit(2);
                }
                console.log('App initialized.');
                console.log('Started listening at port: ' + config.port);
            });
        }).catch((err) => {
            console.log('Error connecting to database: ' + config.dbName);
            console.log('App initialization failed.')
            process.exit(1);
        });
    }

    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
        this.init();
    }
}

var App: ApiApp;

export default () => {
    App = new ApiApp();
    return App;
}