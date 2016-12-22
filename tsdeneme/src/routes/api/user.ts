import * as express from 'express';
import { ApiBase } from './index';

class UserRoutes extends ApiBase {

    userIndex(req: express.Request, res: express.Response, next: Function) {
        res.render('test', {
            title: 'User Index'
        })
    }

    constructor(router?: express.Router) {
        super(router);
        this.router.get('/account', this.userIndex);
    }
}

export let route: UserRoutes;
export function init(router?: express.Router) { route = new UserRoutes(router) }