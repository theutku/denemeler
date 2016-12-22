import * as express from 'express';

export class ApiBase {

    apiIndex(req: express.Request, res: express.Response, next: Function) {
        res.render('test', {
            title: 'Api Index'
        })
    }

    constructor(public router?: express.Router) {
        this.router.get('/', this.apiIndex);
    }
}

export let route: ApiBase;
export function init(router?: express.Router) { route = new ApiBase(router) }