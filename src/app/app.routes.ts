import { Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SignoutComponent } from './auth/signout/signout.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
    { path: '', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'signout', component: SignoutComponent },
    { path: 'inbox', canMatch: [AuthGuard], loadChildren: () => import('./inbox/inbox.module').then(m => m.InboxModule)}
];
