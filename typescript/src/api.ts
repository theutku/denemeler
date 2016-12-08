"use strict";

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

        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());

        this.app.use(logger('dev'));

        const server = http.createServer(this.app);

        server.listen(config.port);

        db.connect();

        server.on('error', (e: Error) => {
            console.log('Error starting app: ' + e);
        });

        server.on('listening', () => {
            console.log('App started listening at port: ' + config.port);
        });

    }

    constructor() {

    }
}

var App: ApiApp
export default () => (App = new ApiApp()); 