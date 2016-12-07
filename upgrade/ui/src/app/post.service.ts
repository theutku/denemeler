import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User } from './models/user.component';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PostService {

    newContactUrl: string = "http://localhost:3000/users/addcontact"
    loginUrl: string = 'http://localhost:3000/users/login';
    
    constructor(private http: Http) {}

    addContact(newContact) {
        console.log(newContact);
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'});
        return this.http.post(this.newContactUrl, newContact, headers)
                        .toPromise()
                        .then(res => res.json())
                        .catch(err => console.log(err));
    }

}