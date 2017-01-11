import * as express from 'express';

class WebRoutes {

    indexRoute(req: express.Request, res: express.Response, next: express.NextFunction) {
        res.render('index', {
            title: 'Home'
        });
    }

    constructor(public router?: express.Router) {
        this.router.get('/home', this.indexRoute);
    }
}

let webRoutes: WebRoutes;

export default function init(router?: express.Router) {
    webRoutes = new WebRoutes(router);
    return webRoutes.router
}