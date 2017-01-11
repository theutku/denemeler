import * as express from 'express';
import UserModel from '../../models/crud';
import config from '../../config';


class UserRoutes {

    accountHomeRoute(req: express.Request, res: express.Response, next: Function) {
        res.render('register', {
            title: 'Register'
        })
    }

    accountCreateRoute(req: express.Request, res: express.Response, next: Function) {
        var newUser = req.body
        newUser.meta = newUser.meta || {
            created: new Date(),
            version: config.version
        }
        var userModel = new UserModel(db)
        userModel.createUser(newUser).then((user) => {
            res.render('test', {
                title: 'User Save'
            })
            next();
        }).catch((err) => next(err));
    }

    constructor(public router?: express.Router) {
        this.router.get('/account', this.accountHomeRoute);
        this.router.post('/account', this.accountCreateRoute);
    }
}


let userRoutes: UserRoutes;

export function init(router?: express.Router) {
    userRoutes = new UserRoutes(router);
    return userRoutes.router;
}