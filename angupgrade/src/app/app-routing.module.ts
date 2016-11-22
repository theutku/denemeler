import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import { ContactsComponent } from './contacts/contacts.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {path: 'users/register', component: RegisterComponent},
    {path: 'users/login', component: LoginComponent},
    {path: 'users/contacts', component: ContactsComponent},
    {path: 'users/account', component: AccountComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent}
    
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}