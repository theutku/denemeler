import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GetService {
    
    contactsUrl: string = 'http://localhost:3000/users/contacts'

    constructor(private http: Http) {
        console.log('Get Service Initialized.');
    }

    getData() {
        return this.http.get(this.contactsUrl)
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.log('An error occured: ', error);
        return Promise.reject(error.message || error);
    }
}