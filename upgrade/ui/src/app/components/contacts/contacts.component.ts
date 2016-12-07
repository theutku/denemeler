import { Component } from '@angular/core';
import { GetService } from '../../get.service';
import { PostService } from '../../post.service';

import { Contact, NewContact } from '../../models/contact.component'; 

@Component({
    selector: 'app-contacts',
    templateUrl: 'contacts.component.html',
    styleUrls: ['../../../styles/styles.css'],
    providers: [GetService, PostService]
})

export class ContactsComponent {

    newContact = new NewContact();

    contacts: Contact[];

    constructor(private getService: GetService, private postService: PostService) {
        
    }

    getContacts() {
        
    }
  
    addContact() {
        this.postService.addContact(this.newContact)
                        .then(res => console.log(res))
                        .catch(err => console.log(err));
    }
}


