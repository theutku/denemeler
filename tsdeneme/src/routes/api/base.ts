import * as express from 'express';
import * as apiIndex from './index';
import * as userRoutes from './user';

export default class RouteLoader {
    static use(router?: express.Router) {
        return [
            apiIndex.init(router),
            userRoutes.init(router)
        ]
    }
}