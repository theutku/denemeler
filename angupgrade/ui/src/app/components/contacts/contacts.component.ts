import { Component, OnInit } from '@angular/core';
import { GetService } from '../../get.service';
import { PostService } from '../../post.service';

import { Contact } from '../../models/contact.component'; 

@Component({
    selector: 'app-contacts',
    templateUrl: 'contacts.component.html',
    styleUrls: ['../../../styles/styles.css'],
    providers: [GetService, PostService]
})

export class ContactsComponent implements OnInit{

    contacts: Contact[];


    constructor(private getService: GetService, private postService: PostService) {
        
     }

    getContacts() {
        this.getService.getData().subscribe(contacts => {
            if(contacts.length) {
            this.contacts = contacts;
            console.log('got contacts');
            } else {
                console.log('No contacts found.');
            }
        }, error => console.log('Cannot get contacts from server.'));
    }

    ngOnInit() {
        this.getContacts();
    }

    deleteContact(id: number) {
           console.log(id);
           this.postService.deleteContact(id).subscribe(() => {
               console.log('deleted');
               return this.getContacts();
            });
           
    }
  
}


