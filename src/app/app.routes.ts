import { Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SignoutComponent } from './auth/signout/signout.component';

export const routes: Routes = [
    { path: '', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'signout', component: SignoutComponent }
];
