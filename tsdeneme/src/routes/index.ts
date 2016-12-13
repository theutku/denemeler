import { Base } from './base'
import * as express from 'express';

class IndexRoute extends Base {

    constructor(router: express.Router) {
        super()
        this.router.get('/', (req: Express.Request, res: Express.Response) => {
            res.render()
        });
    }
}