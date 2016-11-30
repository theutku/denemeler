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
    errorMessage: string = "";
    errorContent: string = "";

    constructor(private getService: GetService, private postService: PostService) {
        
     }

    getContacts() {
        this.getService.getData()
            .then(contacts => {
                if(contacts.length) {
                this.contacts = contacts;
                console.log('Contacts received.');
                } else {
                    console.log('No contacts found.');
                }
            })
            .catch(error => {
                console.log('Cannot get contacts from server.');
                this.errorMessage = "Contacts cannot be acquired from the server.";
                this.errorContent = "Make sure you are connected to the internet."
            });
    }

    ngOnInit() {
        this.getContacts();
    }

    deleteContact(id: number) {
           console.log(id);
           this.postService.deleteContact(id)
                .then(() => {
                    console.log('deleted');
                    return this.getContacts();
                })
                .catch(error => {
                    console.log('Cannot delete contact: ' + error);
                    this.errorMessage = "Contact cannot be deleted.";
                    this.errorContent = "Operation could not be performed.";
                });
           
    }
  
}


