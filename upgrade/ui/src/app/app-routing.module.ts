import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component'
import { RegisterComponent } from './components/register/register.component';
import { AccountComponent } from './components/account/account.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { HomeComponent } from './components/home/home.component';

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