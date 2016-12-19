import * as express from 'express';

class Route {

    indexRoute(req: express.Request, res: express.Response, next: Function) {
        res.render('index', {
            title: 'Express with TS'
        });
    }

    constructor(public router?: express.Router) {
        this.router.get('/', this.indexRoute);

    }
}

export let route: Route;
export function init(router?: express.Router) { route = new Route(router) }