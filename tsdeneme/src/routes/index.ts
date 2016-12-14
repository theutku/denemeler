import { Base } from './base'
import * as express from 'express';

class IndexRoute extends Base {

    renderIndex(req: express.Request, res: express.Response, next: Function) {
        res.render('index', {
            title: 'Express with Typescript'
        });
    }

    constructor() {
        super()
        this.router.get('/', this.renderIndex(req, res, next))
    }
}
var router: express.Router;
export default new IndexRoute();