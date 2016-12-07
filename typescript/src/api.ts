"use strict";

import * as bodyParser from 'body-parser'
import * as express from 'express';
import * as path from 'path';
import config from './config';
import * as http from 'http';
import * as logger from 'morgan';

class ApiApp {

    public app: express.Application;

    bootsrap() {
        this.app = express();

        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());

        const server = http.createServer(this.app);

        server.listen(config.port);
    }

    constructor() {

    }
}

var App: ApiApp
export default () => (App = new ApiApp()); 