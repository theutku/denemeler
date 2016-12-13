import * as bodyParser from 'body-parser'
import * as express from 'express';
import * as path from 'path';
import config from './config';
import * as http from 'http';
import * as logger from 'morgan';
import db from './database';

class ApiApp {

    public app: express.Application;

    bootsrap() {
        this.app = express();

        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());

        this.app.use(logger('dev'));

        const server = http.createServer(this.app);


        db.connect().then(() => {
            server.listen(config.port);
            console.log('App started listening at port: ' + config.port);


        }).catch((err) => {
            console.log('Error starting app. Cannot connect to database.');

        })

    }

    constructor() {

    }
}

var App: ApiApp
export default () => { return App = new ApiApp() }