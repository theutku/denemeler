import * as express from 'express';

class ApiBase {

    apiIndex(req: express.Request, res: express.Response, next: Function) {
        res.render('test', {
            title: 'Api Index'
        })
    }

    constructor(public router?: express.Router) {
        this.router.get('/api', this.apiIndex);
    }
}

export function init(router?: express.Router) {
    let apiBase = new ApiBase(router);
    return apiBase.router;
}