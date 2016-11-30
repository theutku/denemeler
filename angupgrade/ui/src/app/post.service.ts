import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User } from './models/user.component';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PostService {

    loginUrl: string = 'http://localhost:3000/users/login';
    
    constructor(private http: Http) { }

    deleteContact(id: number) {
        let headers = new Headers({ 'Content-Type': 'application/json'});
        let body = "";
        return this.http.post('http://localhost:3000/users/deletecont/' + id, body, headers)
                .toPromise()
                .then((res: Response) => console.log('RES:' + res))
                .catch(this.errorHandle);
    }

    addContact(contName: string, contEmail: string, contPhone: number) {

    }

    login(user: User) {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({headers: headers});
        let body = 'username=' + user.username + '&password=' + user.password;
        return this.http.post(this.loginUrl, body, options)
                .toPromise()
                .then((res: Response) => console.log('RES:' + res))
                .catch(this.errorHandle);
    }

    private errorHandle(error: any): Promise<any> {
        console.log('An error occured: ', error);
        return Promise.reject(error.message || error);
    }
}