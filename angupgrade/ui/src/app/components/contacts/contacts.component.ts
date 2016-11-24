import { Component } from '@angular/core';
import { PostsService } from '../../posts.service';

import { Contact } from '../../models/contact.component'; 

@Component({
    selector: 'app-contacts',
    templateUrl: 'contacts.component.html',
    styleUrls: ['../../../styles/styles.css'],
    providers: [PostsService]
})

export class ContactsComponent {

    contacts: Contact[];


    constructor(private postsService: PostsService) { }

    getContacts() {
        this.postsService.getData().subscribe(contacts => {
            this.contacts = contacts;
        });   
    }
}


