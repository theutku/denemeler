import * as express from 'express';

class ApiBase {

    private apiIndex(req: express.Request, res: express.Response, next: Function) {
        res.render('test', {
            title: 'Api Index'
        })
    }

    constructor(public router?: express.Router) {
        this.router.get('/api', this.apiIndex);
    }
}

let apiBase: ApiBase

export function init(router?: express.Router) {
    apiBase = new ApiBase(router);
    return apiBase.router;
}