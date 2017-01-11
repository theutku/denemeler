import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as http from 'http';
import config from './config';
import db from './db';
import * as path from 'path';

import * as WebUserRoutes from './routes/web/index';
import * as ApiUserRoutes from './routes/api/index';
import * as UserRoutes from './routes/web/user';


class ApiApp {

    public app: express.Application;
    public router: express.Router;

    private middlewares(): void {
        this.app.use(logger('dev'));
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());

        this.app.set('view engine', 'ejs');
        this.app.set('views', path.join(__dirname, '../views'));
    }

    private routes(): void {
        this.app.use(this.router);
        this.router.get('/', (req, res, next) => {
            res.render('index', {
                title: 'TS Express'
            });
        });

        this.app.use('/user', WebUserRoutes.init(this.router));
        this.app.use('/user', ApiUserRoutes.init(this.router));
        this.app.use('/new', UserRoutes.init(this.router));

    }

    private normalizePort(val: number | string): number | string | boolean {
        let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
        if (isNaN(port)) return val;
        else if (port >= 0) return port;
        else return false;
    }

    private init() {
        const server = http.createServer(this.app);
        const port = this.normalizePort(config.port);

        return db.connect().then(() => {
            server.listen(port, (err: Error) => {
                if (err) {
                    console.log(err);
                    process.exit(2);
                }
                console.log('Connected to database.');
                console.log('App started listening at port: ' + port);
            });
        }).catch((err) => {
            console.log('Error initializing App. Cannot connect to database.');
            process.exit(1);
        });
    }

    constructor() {
        this.app = express();
        this.router = express.Router();
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

//     bootstrap() {
//         return new Promise((resolve, reject) => {

//             this.app = express();
//             this.router = express.Router();

//             this.app.use(bodyParser.urlencoded({ extended: true }));
//             this.app.use(bodyParser.json());
//             this.app.use(logger('dev'));

//             this.app.set('view engine', 'ejs');
//             this.app.set('views', path.join(__dirname, '../views'));

//             webRouteLoader.use(this.router);
//             apiRouteLoader.use(this.router);

//             this.app.use('/', this.router);
//             this.app.use('/user', this.router);

//             const server = http.createServer(this.app);

//             return db.connect().then(() => {
//                 server.listen(config.port, (err: Error) => {
//                     if (err) {
//                         console.log(err);
//                         process.exit(2);
//                     }
//                     console.log('Connected to database.');
//                     console.log('App started listening at port: ' + config.port);
//                     resolve();
//                 });
//             }).catch((err) => {
//                 console.log('Error initializing App. Cannot connect to database.');
//                 process.exit(1);
//             });
//         });
//     }
// }

// var App: ApiApp;

// export default () => {
//     App = new ApiApp();
//     return App;
// }
