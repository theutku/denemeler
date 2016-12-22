import * as express from 'express';
import * as indexPage from './index'
import * as userRoute from './user'

export default class RouteLoader {
    static use(router?: express.Router) {
        return [
            indexPage.init(router),
            userRoute.init(router)
        ]
    }
}