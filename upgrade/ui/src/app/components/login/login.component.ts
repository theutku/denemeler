import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { PostService } from '../../post.service';
import { User } from '../../models/user.component';

interface CurrentLoginModel {
    username: string;
    password: string;
}

class CurrentLogin implements CurrentLoginModel {
    username: "";
    password: "";
}

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['../../../styles/styles.css'],
    providers: [PostService]
})

export class LoginComponent {

    currentLogin = new CurrentLogin();
    
    constructor(private postService: PostService, private router: Router) {

    }

}