import { Component } from '@angular/core';
import { PostService } from '../../post.service';
import { User } from '../../models/user.component';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['../../../styles/styles.css'],
    providers: [PostService]
})

export class LoginComponent {

    currentLogin: User = {
        username: "",
        password: ""
    }
    
    constructor(private postService: PostService) {

    }

    login() {
        // this.currentLogin.username = username;
        // this.currentLogin.password = password;
        this.postService.login(this.currentLogin).subscribe(() => {
            console.log('Login successful.');
        });
    }
}