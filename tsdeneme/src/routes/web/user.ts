import * as express from 'express';
import { RouteBase } from './index';

class UserRoute extends RouteBase {

    getAccountPage(req: express.Request, res: express.Response, next: Function) {
        res.render('account', {
            title: 'User Account'
        })
    }

    constructor(public router?: express.Router) {
        super(router);
        this.router.get('/account', this.getAccountPage);
    }
}

export let route: UserRoute;
export function init(router: express.Router) { route = new UserRoute(router) }