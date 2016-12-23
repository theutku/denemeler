import * as express from 'express';

export class WebBase {

    indexRoute(req: express.Request, res: express.Response, next: Function) {
        res.render('index', {
            title: 'Express with TS'
        });
    }

    constructor(public router?: express.Router) {
        this.router.get('/', this.indexRoute);
    }
}

export function init(router?: express.Router) {
    let webBase = new WebBase(router);
    return webBase.router;
}