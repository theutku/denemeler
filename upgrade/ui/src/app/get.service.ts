import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GetService {
    
    contactsUrl: string = 'http://localhost:3000/users/contacts'

}