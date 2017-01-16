import * as express from 'express';

export default class RouteLoader {
    public static init(router?: express.Router) {
        return [
            require('./web').default(router)
        ]
    }
}
