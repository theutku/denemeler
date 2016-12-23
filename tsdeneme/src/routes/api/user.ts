import * as express from 'express';
import { ApiBase } from './index';

export class UserRoutes {

    userIndex(req: express.Request, res: express.Response, next: Function) {
        res.render('test', {
            title: 'User Index'
        })
    }

    constructor(public router: express.Router) {
        this.router.get('/account', this.userIndex);
    }
}

export function init(router?: express.Router) { return new UserRoutes(router) }