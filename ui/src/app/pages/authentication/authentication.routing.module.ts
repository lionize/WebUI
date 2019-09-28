import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';
import { AuthenticationComponent } from './authentication.component';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('src/app/pages/landing/landing.module').then(module => module.LandingModule),
    },
    {
        path: 'auth', component: AuthenticationComponent,
        children: [
            { path: 'signin', component: SignInComponent },
            { path: 'signup', component: SignUpComponent },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AuthenticationRoutingModule { }