import * as express from 'express';

class WebBase {

    indexRoute(req: express.Request, res: express.Response, next: Function) {
        res.render('index', {
            title: 'Express with TS'
        });
    }

    constructor(public router?: express.Router) {
        this.router.get('/web', this.indexRoute);
    }
}

var webBase: WebBase

export function init(router?: express.Router) {
    webBase = new WebBase(router);
    return webBase.router;
}