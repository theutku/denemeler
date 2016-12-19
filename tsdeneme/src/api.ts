import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as http from 'http';
import config from './config';
import db from './db';
import routeLoader from './routes/base';
import * as path from 'path';


export class ApiApp {

    app: express.Application;
    router: express.Router;

    constructor() {

    }

    bootstrap() {
        return new Promise((resolve, reject) => {
            this.app = express();
            this.router = express.Router();

            this.app.use(bodyParser.urlencoded({ extended: true }));
            this.app.use(bodyParser.json());
            this.app.use(logger('dev'));

            this.app.set('view engine', 'ejs');
            this.app.set('views', path.join(__dirname, '../views'));

            routeLoader.use(this.router);
            this.app.use('/', this.router);

            const server = http.createServer(this.app);

            db.connect().then(() => {
                server.listen(config.port, (err: Error) => {
                    if (err) {
                        console.log(err);
                        process.exit(2);
                    }
                    console.log('Connected to database.');
                    console.log('App started listening at port: ' + config.port);
                    resolve();
                });
            }).catch((err) => {
                console.log('Error initializing App. Cannot connect to database.');
                process.exit(1);
            });
        });
    }
}

var App: ApiApp;

export default () => {
    App = new ApiApp();
    return App;
}
