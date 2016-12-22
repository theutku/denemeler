import * as express from 'express';

export class RouteBase {

    indexRoute(req: express.Request, res: express.Response, next: Function) {
        res.render('index', {
            title: 'Express with TS'
        });
    }

    constructor(public router?: express.Router) {
        this.router.get('/', this.indexRoute);

    }
}

export let route: RouteBase;
export function init(router?: express.Router) { route = new RouteBase(router) }