import * as express from 'express';

class WebBase {

    private webIndex(req: express.Request, res: express.Response, next: Function) {
        res.render('test', {
            title: 'Web Index'
        });
    }

    constructor(public router?: express.Router) {
        this.router.get('/user', this.webIndex);
    }
}

let webBase: WebBase

export function init(router?: express.Router) {
    webBase = new WebBase(router);
    return webBase.router;
}