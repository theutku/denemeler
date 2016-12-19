import * as express from 'express';
import * as indexPage from './indexpage'

export default class RouteLoader {
    static use(router?: express.Router) {
        return [
            indexPage.init(router)
        ]
    }
}