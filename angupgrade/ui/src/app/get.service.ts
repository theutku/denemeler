import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GetService {
    
    constructor(private http: Http) {
        console.log('init');
    }

    getData() {
        return this.http.get('http://localhost:3000/users/contacts')
            .map(res => res.json());
    }
}