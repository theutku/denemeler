import * as express from 'express';
import { RouteBase } from './index';

class UserRoute {

    getAccountPage(req: express.Request, res: express.Response, next: Function) {
        res.render('account', {
            title: 'User Account'
        })
    }

    constructor(public router: express.Router) {
        this.router.get('/account', this.getAccountPage);
    }
}

export function init(router: express.Router) { return new UserRoute(router) }